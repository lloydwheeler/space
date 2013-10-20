function Player(id, x, y) {
  this.id = id;
  this.friction = .9;
  this.maxVelocity = 10;
  this.position = {
    x: x,
    y: y
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.startPosition = {
    x: x,
    y: y
  };
}

/* Draw player */

Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.position.x, this.position.y, 20, 20);
  ctx.fillStyle = 'rgba(255,125,125,1)';
  ctx.fill();
};