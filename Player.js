function Player(username, playerID, canvasWidth, canvasHeight) {
  this.id = playerID;
  this.username = username;
  this.position = {
    x: canvasWidth*Math.random(),
    y: canvasHeight*Math.random()
  }
}

Player.prototype.getID = function() {
  return this.id;
}

Player.prototype.setID = function(newID) {
  this.id = newID;
}

Player.prototype.getPosition = function() {
  return this.position;
}

Player.prototype.setPosition = function(x, y) {
  this.position.x = x;
  this.position.y = y;
}

module.exports = Player;