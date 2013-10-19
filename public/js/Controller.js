function Controller() {
  var controllers = navigator.webkitGetGamepads()
  console.dir(controllers);
  this.controller = controllers[0];
  this.inputs;

  console.log(this.controller)

  if(this.controller === undefined) {
    return false;
  } else {
    this.getState(this.controller);
  }  
}

Controller.prototype.getState = function() {
  return this.controller;
};