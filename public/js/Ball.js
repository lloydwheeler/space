function Ball(x,y) {
  this.color = "rgba(255,255,255,.5)";
  this.friction = .97;
  this.boundingBox = 30;
  this.position = {x: x, y: y};
  this.velocity = {x: 0, y: 0};
  this.possession = false;  // Set to player ID on posession;
  this.size = 10;
}

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.fill();
}

Ball.prototype.updatePossession = function(player) {
  this.possession = player;
  this.position.x = player.position.x + 10;
  this.position.y = player.position.y + 10;
}