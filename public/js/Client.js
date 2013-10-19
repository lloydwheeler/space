var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function Client(server) {
  this.gameStarted = false;
  this.keys = [];
  this.player = null;
  this.players = [];
  this.stars = [];
  this.socket = io.connect(server);

  this.initGame();
}

Client.prototype.initGame = function() {

  var height = $(window).height();
  var width = $(window).width();
  this.canvas = $('#canvas').get(0);
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext('2d');
  // this.ball = new Ball((this.canvas.width/2 - 10), (this.canvas.height/2 - 10));
  // this.ball.draw(this.ctx);


  this.initListeners();
  this.initStars();
  requestAnimationFrame(this.draw.bind(this));
};

Client.prototype.initListeners = function() {

  /* Allow for reference to client object from within socket */
  var self = this;

  /* Get the existing game state on connection */
  this.socket.on('game state', function(data) {
    self.initPlayers(data.players);
    self.gameStarted = true; 
  });

  /* Add a new player to the existing game */
  this.socket.on('new player', function(player) {
    /* If the player doesn't already exist */
    if (!self.findPlayerById(player.id)) {
      var player = new Player(player.id, player.x, player.y);
      self.players.push(player);
    }
  });

  /* Update a player's state */
  this.socket.on('update player', function(player) {
    var temp = self.findPlayerById(player.id);
    temp.position.x = player.position.x;
    temp.position.y = player.position.y;
  });

  /* Remove a player */
  this.socket.on('remove player', function(player) {
    var temp = self.findPlayerById(player.id);
    /* remove this player */
  });
};

Client.prototype.initControls = function() {
  var self = this;

  



  /* On keydown set movement in corresponding direction to true */
  $(window).on("keydown", function(e) {
    self.keys[e.keyCode] = true;
  });
  
  /* On keyup set movement in corresponding direction to false */
  $(window).on("keyup", function(e) {
    self.keys[e.keyCode] = false;
  });
};

Client.prototype.initPlayers = function(players) {

  /* Initiliase all other players on the server */

  var i = 0, numPlayers = players.length, player;
  for(; i < numPlayers; i++) {
    player = players[i];
    this.players.push(new Player(player.id, player.position.x, player.position.y));
  }
};

Client.prototype.addPlayer = function(username) {

  /* Add a new player to the game */

  if (this.player === null) {
    this.player = new Player(10, (this.canvas.width/2 - 10), (this.canvas.height/2 - 10));
    this.socket.emit("add player", this.player.position.x, this.player.position.y);
    this.initControls();
  }
};

Client.prototype.findPlayerById = function(id) {

  /* Find a player by a given ID */

  var i = 0, numPlayers = this.players.length;
  for(; i < numPlayers; i++) {
    if (this.players[i].id === id) {
      return this.players[i];
    }
  }
};

Client.prototype.draw = function() {
  var height = $(window).height();
  var width = $(window).width();

  this.ctx.clearRect(0,0,width,height);

  this.canvas.width = width;
  this.canvas.height = height;

  this.ctx.fillStyle = "#2A2C33";
  this.ctx.fillRect(0,0,width,height);

  if (this.player !== null) {
    this.movePlayer();
  }

  this.drawStars();
  this.drawPlayers();
  // this.ball.draw(this.ctx);
  requestAnimationFrame(this.draw.bind(this));
};

Client.prototype.drawPlayers = function() {
  var i = 0, numPlayers = this.players.length;
  for(; i < numPlayers; i++) {
    this.players[i].draw(this.ctx);
  }
};

Client.prototype.initStars = function() {
  for(var i = 0; i < 40; i++) {
    var star = new Star(this.canvas.width*Math.random(), this.canvas.height*Math.random());
    star.draw(this.ctx, {x:0, y:0});
    this.stars.push(star);
  }
};

Client.prototype.drawStars = function() {
  var i = 0, numStars = this.stars.length;
  for(; i < numStars; i++) {
    if(this.player) {
      this.stars[i].draw(this.ctx, this.positionDelta(this.player.startPosition, this.player.position));
    }
  }
};

Client.prototype.movePlayer = function() {
  var self = this;

  /* Get gamepad */
  var gamepads = navigator.webkitGetGamepads()
  this.gamepad = gamepads[0];

  /* Set the stick deadzone */
  this.gamepad.deadzone = .15;

  /* If the analogue stick is outside the deadzone in X direction */
  if(Math.abs(this.gamepad.axes[0]) > this.gamepad.deadzone) {
    /* Set the player speed to match the input value */
    this.player.velocity.x = this.gamepad.axes[0]*this.player.maxVelocity;
  } else {
    /* Else reduce the player's velocity due to friction */
    this.player.velocity.x *= this.player.friction;
  }
  
  /* If the analogue stick is outside the deadzone in Y direction */
  if(Math.abs(this.gamepad.axes[1]) > this.gamepad.deadzone) {
    /* Set the player speed to match the input value */
    this.player.velocity.y = this.gamepad.axes[1]*this.player.maxVelocity;
  } else {
    /* Else reduce the player's velocity due to friction */
    this.player.velocity.y *= this.player.friction;
  }


  // if (this.keys[38]) {
  //   // up
  //   if(this.player.velocity.y > -this.player.maxVelocity)
  //     this.player.velocity.y -= 1;
  // }

  // if (this.keys[40]) {
  //   // down
  //   if(this.player.velocity.y < this.player.maxVelocity)
  //     this.player.velocity.y += 1;
  // }

  // if (this.keys[39]) {
  //   // left
  //   if(this.player.velocity.x < this.player.maxVelocity)
  //     this.player.velocity.x += 1;
  // }

  // if (this.keys[37]) {
  //   // right
  //   if(this.player.velocity.x > -this.player.maxVelocity)
  //     this.player.velocity.x -= 1;
  // }

  /* Gradually reduce velocity due to friction */
  // this.player.momentum.y *= this.player.friction;
  // this.player.momentum.x *= this.player.friction;

  /* Check for a collision */
  this.checkForCollision();

  /* Update the player's position */
  this.player.position.y += this.player.velocity.y
  this.player.position.x += this.player.velocity.x

  /* Stop the player from leaving the game area */
  this.player.position = this.checkForBoundary(this.player.position);

  /* Send the new player position to the server */ 
  this.socket.emit('update player', {x: self.player.position.x, y: self.player.position.y});
}

Client.prototype.checkForCollision = function(player) {
  /* Check for collision with all other players */
}

Client.prototype.checkForBoundary = function(playerPosition) {

  /* Existing player position */
  var position = {x: playerPosition.x, y: playerPosition.y};

  /* If the player is at the left boundary */
  if(playerPosition.x < 0) {
    position.x = 0;
  }

  /* If the player is at the right boundary */
  if(playerPosition.x > this.canvas.width - 20) {
    position.x = this.canvas.width - 20;
  }

  /* If the player is at the top boundary */
  if(playerPosition.y < 0) {
    position.y = 0;
  }

  /* If the player is at the bottom boundary */
  if(playerPosition.y > this.canvas.height - 20) {
    position.y = this.canvas.height - 20;
  }

  return position;
}

Client.prototype.positionDelta = function(before, after) {
  /* Returns the difference between two position vectors */
  return {x: after.x - before.x, y: after.y - before.y};
};


  