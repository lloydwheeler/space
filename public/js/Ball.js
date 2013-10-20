function Ball(x,y) {
  this.color = "rgba(0,0,0,1)";
  this.position = {x: x, y: y};
  this.possession = false;  // Set to player ID on posession;
  this.size = 10;
}

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

Ball.prototype.updatePossession = function(player) {
  this.possession = player;
  this.position.x = player.position.x + 10;
  this.position.y = player.position.y + 10;
}