function Player(id, x, y) {
  this.id = id;
  this.position = {
    x: x,
    y: y
  }
  this.friction = .8;
  this.speed = 122;
  this.velocity = {
    y: 0,
    x: 0
  }
}

/* Draw player */

Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.position.x, this.position.y, 20, 20);
  ctx.fillStyle = 'rgba(255,125,125,1)';
  ctx.fill();
};