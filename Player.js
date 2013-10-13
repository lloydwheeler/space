function Player(playerID, startX, startY) {
  this.id = playerID;
  this.position = {
    x: startX,
    y: startY
  }
}

module.exports = Player;