function Player(id, x, y) {
  this.id = id;
  this.position = {
    x: x,
    y: y
  }
}

// Player.prototype.getID = function() {
//   return this.id;
// }

// Player.prototype.setID = function(newID) {
//   this.id = newID;
// }

// Player.prototype.getPosition = function() {
//   return this.position;
// }

// Player.prototype.setPosition = function(x, y) {
//   this.position.x = x;
//   this.position.y = y;
// }

/* Draw player */

Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.position.x, this.position.y, 20, 20);
  ctx.fillStyle = 'rgba(255,125,125,1)';
  ctx.fill();
};