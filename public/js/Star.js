function Star(x,y) {
  this.pos = {
    x: x,
    y: y;
  };
  this.z = Math.random()*0.5;
}

Star.prototype.update = function(movementDelta) {
  this.pos.x -= movementDelta.x*(this.z+0.3);
  this.pos.y -= movementDelta.y*(this.z+0.3);
};

Star.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, (this.z*10), 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
};