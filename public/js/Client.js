var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function Client(server) {
  this.socket = io.connect(server);
  this.player = null;
  this.players = [];
  this.stars = [];
  this.gameStarted = false;
  this.initListeners();
  this.initGame();
  this.keys = [];
}

Client.prototype.initGame = function() {

  var height = $(window).height();
  var width = $(window).width();

  /* Create a new canvas object */
  this.canvas = $('#canvas').get(0);
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext('2d');
  this.createStars();
  // this.draw();
  requestAnimationFrame(this.draw.bind(this));
};

Client.prototype.initListeners = function() {

  /* Allow for reference to client object from within socket */
  var self = this;

  this.socket.on('new player', function(data) {
    if (!self.gameStarted) {
      self.initPlayers(data.players);
      self.gameStarted = true;
    } else { 
      var player = new Player(data.id, data.x, data.y);
      self.players.push(player);
    }
    // self.draw();  
  });

  this.socket.on('update player', function(player) {
    var temp = self.findPlayerById(player.id);
    temp.position.x = player.position.x;
    temp.position.y = player.position.y;
    // self.draw();
  });
};

Client.prototype.initControls = function() {
  var self = this;

  $(window).on("keydown", function(e) {
    self.keys[e.keyCode] = true;
  });
  
  $(window).on("keyup", function(e) {
    self.keys[e.keyCode] = false;
  });
};

Client.prototype.addPlayer = function(username) {
  if (this.player === null) {
    this.player = new Player(10, 100, 100);
    this.socket.emit("add player", this.player.position.x, this.player.position.y);
    this.initControls();
    this.movePlayer();
  }
};

Client.prototype.findPlayerById = function(id) {
  var i = 0, numPlayers = this.players.length;
  for(; i < numPlayers; i++) {
    if (this.players[i].id === id) {
      return this.players[i];
    }
  }
};

Client.prototype.initPlayers = function(players) {
  var i = 0, numPlayers = players.length, player;
  for(; i < numPlayers; i++) {
    player = players[i];
    this.players.push(new Player(player.id, player.position.x, player.position.y));
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
  requestAnimationFrame(this.draw.bind(this));
};

Client.prototype.drawPlayers = function() {
  var i = 0, numPlayers = this.players.length;
  for(; i < numPlayers; i++) {
    this.players[i].draw(this.ctx);
  }
};

Client.prototype.createStars = function() {
  for(var i = 0; i < 25; i++) {
    var star = new Star(this.canvas.width*Math.random(), this.canvas.height*Math.random());
    star.draw(this.ctx, {x: 0, y: 0});
    this.stars.push(star);
  }
};

Client.prototype.drawStars = function() {
  var i = 0, numStars = this.stars.length;
  for(; i < numStars; i++) {
    if(this.player)
      this.stars[i].draw(this.ctx, this.positionDelta(this.player.oldPosition, this.player.position));
  }
};

Client.prototype.movePlayer = function() {
  var self = this;

  if (this.keys[38]) {
    // up
    if(this.player.velocity.y > -this.player.maxVelocity)
      this.player.velocity.y -= 1;
  }

  if (this.keys[40]) {
    // down
    if(this.player.velocity.y < this.player.maxVelocity)
      this.player.velocity.y += 1;
  }

  if (this.keys[39]) {
    // left
    if(this.player.velocity.x < this.player.maxVelocity)
      this.player.velocity.x += 1;
  }

  if (this.keys[37]) {
    // right
    if(this.player.velocity.x > -this.player.maxVelocity)
      this.player.velocity.x -= 1;
  }

  // this.player.oldPosition.y = this.player.position.y;
  // this.player.oldPosition.x = this.player.position.x;
  this.player.velocity.y *= this.player.friction;
  this.player.velocity.x *= this.player.friction;
  this.player.position.y += this.player.velocity.y;
  this.player.position.x += this.player.velocity.x;

  if(this.player.position.x < 0) {
    this.player.position.x = 0;
  }

  if(this.player.position.x > this.canvas.width - 20) {
    this.player.position.x = this.canvas.width - 20;
  }

  if(this.player.position.y < 0) {
    this.player.position.y = 0;
  }

  if(this.player.position.y > this.canvas.height - 20) {
    this.player.position.y = this.canvas.height - 20;
  }

  this.socket.emit('update player', {x: self.player.position.x, y: self.player.position.y});
}

Client.prototype.positionDelta = function(before, after) {
  return {x: after.x - before.x, y: after.y - before.y};
}


  