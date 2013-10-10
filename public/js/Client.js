function Client(server) {
  this.socket = io.connect(server);
  this.game;
  this.player;
  this.stars = [];
  this.initListeners();
  this.initGame();
}

Client.prototype.initGame = function() {
  this.canvas = $('#canvas').get(0);
  this.ctx = this.canvas.getContext('2d');
  this.resizeCanvas();
}

Client.prototype.initListeners = function() {

  var self = this;

  this.socket.on('newConnection', function(gameState) {
    self.updateGameState(gameState);
  });
  this.socket.on('newPlayer', function(data) {
    self.player = data[1];
    self.updateGameState(data[0]);
    self.drawPlayers();
  });
  this.socket.on('updateGameState', function(gamestate) {
    self.updateGameState(gamestate);
  });
  this.socket.on('newGameState', function(gamestate) {
    self.updateGameState(gamestate);
    // console.log(self.getGameState());
  });
}

Client.prototype.updateGameState = function(game) {
  this.game = game;
  // console.log(this.game);
  // console.log(this.player);
}

Client.prototype.getGameState = function() {
  return this.game;
}

Client.prototype.addPlayer = function(username) {
  this.socket.emit("addPlayer", username);
  this.player = new Player(username);
}

Client.prototype.updatePlayerPosition = function(player) {
  this.socket.emit("updatePlayerPosition", this.player)
}

Client.prototype.removePlayer = function() {
  this.socket.emit("remove local player", this.player.username);
}

Client.prototype.resizeCanvas = function() {
  var height = $(window).height();
  var width = $(window).width();

  this.ctx.clearRect(0,0,width,height);

  this.canvas.width = width;
  this.canvas.height = height;

  this.ctx.fillStyle = "#2A2C33";
  this.ctx.fillRect(0,0,width,height);


  for(var i = 0; i < 25; i++) {
    var star = new Star(this.canvas.width*Math.random(), this.canvas.height*Math.random());
    star.draw(this.ctx);
    this.stars.push(star);
  }

}

Client.prototype.drawPlayers = function() {

  console.log(this.game.players);

  var height = $(window).height();
  var width = $(window).width();

  this.ctx.clearRect(0,0,width,height);

  this.canvas.width = width;
  this.canvas.height = height;

  this.ctx.fillStyle = "#2A2C33";
  this.ctx.fillRect(0,0,width,height);
  
  for(var i = 0; i < this.game.numPlayers; i++) {
    this.ctx.beginPath();
    this.ctx.rect(this.game.players[i].position.x, this.game.players[i].position.y, 20, 20);
    this.ctx.fillStyle = 'rgba(255,125,125,1)';
    this.ctx.fill();
  }

  this.drawStars();
}

Client.prototype.drawStars = function() {
  var i = 0, numStars = this.stars.length;
  for(; i < numStars; i++) {
    this.stars[i].draw(this.ctx);
  }
}

  