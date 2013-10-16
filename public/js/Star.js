function Star(x,y) {
  this.pos = {
    x: x,
    y: y
  };
  this.size = Math.random() * 3;
  this.luminosity = (this.size/3);
  this.z = this.size*0.05;
}

Star.prototype.draw = function(ctx, positionDelta) {
  ctx.beginPath();
  ctx.arc(this.pos.x - (positionDelta.x*this.z), this.pos.y - (positionDelta.y*this.z), this.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,' + this.luminosity + ')';
  ctx.fill();
};