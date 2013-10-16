function Player(playerID, startX, startY, timestamp) {
  this.id = playerID;
  this.position = {
    x: startX,
    y: startY
  }
  this.lastAction = timestamp;
}

module.exports = Player;