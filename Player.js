function Player(username, playerID) {
  this.id = playerID;
  this.username = username;
  this.position = {
    x: 10,
    y: 10
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