var Player = require("./Player");

function Game() {
  // Need to make some of these vars private

  this.numPlayers = 0;
  this.players = [];
  this.playArea = {
    width: 800,
    height: 400
  };
}

Game.prototype.getGameState = function() {
  return this;
};

Game.prototype.getNumPlayers = function() {
    return this.numPlayers;
};

Game.prototype.getPlayer = function(playerID) {
  return this.players[playerID];
};

Game.prototype.getPlayers = function() {
  return this.players;
};

Game.prototype.getPlayArea = function() {
  return this.playArea;
};

Game.prototype.addPlayer = function(name) {
  this.players[this.numPlayers] = new Player(name, this.numPlayers + 1);
  this.numPlayers++;
};

Game.prototype.removePlayer = function(playerID) {
  this.players.removeElement(playerID);
};

Game.prototype.removePlayerByUsername = function(username) {
  var i;

  console.log("searching for " + username);

  for(i = 0; i < this.players.length; i++) {
    console.log("searching");
    if (this.players[i].username === username) {
      console.log("found!");
    }
  }
};

Array.prototype.removeElement = function(id) {
  if(this.indexOf(id) != -1) {
    this.splice(this.indexOf(value), 1);
  }
}

module.exports = Game;