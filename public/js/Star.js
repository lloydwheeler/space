function Star(x,y) {
  this.pos = {
    x: x,
    y: y
  };
  this.size = Math.random() * 3;
  this.luminosity = (this.size/3);
  this.z = Math.random()*0.5;
}

Star.prototype.update = function(movementDelta) {
  this.pos.x -= movementDelta.x*(this.z+0.3);
  this.pos.y -= movementDelta.y*(this.z+0.3);
};

Star.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,' + this.luminosity + ')';
  ctx.fill();
};