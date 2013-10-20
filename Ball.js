function Ball(x,y) {
  this.color = "rgba(0,0,0,1)";
  this.position = {x: x, y: y};
  this.possession = false;  // Set to player ID on posession;
  this.size = 10;
}

Ball.prototype.updatePossession = function(player) {
  this.possession = player;
  this.position.x = player.position.x + 10;
  this.position.y = player.position.y + 10;
}

module.exports = Ball;