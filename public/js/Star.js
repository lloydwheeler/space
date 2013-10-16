function Star(x,y) {
  this.pos = {
    x: x,
    y: y
  };
  this.size = Math.random() * 3;
  this.luminosity = (this.size/3);
  this.z = this.size*0.05;
}

Star.prototype.update = function(movementDelta) {
  this.pos.x -= movementDelta.x*(this.z+0.3);
  this.pos.y -= movementDelta.y*(this.z+0.3);
};

Star.prototype.draw = function(ctx, positionDelta) {
  ctx.beginPath();
  if (!positionDelta.x) {
    positionDelta.x = 0;
    positionDelta.y = 0;
  }
    ctx.arc(this.pos.x - (positionDelta.x*this.z), this.pos.y - (positionDelta.y*this.z), this.size, 0, 2 * Math.PI, false);

  ctx.fillStyle = 'rgba(255,255,255,' + this.luminosity + ')';
  ctx.fill();
};