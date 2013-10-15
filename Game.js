var Player = require("./Player");

function Game(width, height) {
  this.numPlayers = 0;
  this.players = [];
  this.playArea = {
    width: width,
    height: height
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

Game.prototype.getLatestPlayer = function() {
  return this.players[this.players.length-1];
}

Game.prototype.getPlayers = function() {
  return this.players;
};

Game.prototype.getPlayArea = function() {
  return this.playArea;
};

Game.prototype.addPlayer = function(id, x, y) {
  var player = new Player(id, x, y);
  this.players[this.numPlayers] = player;
  this.numPlayers++;
};

Game.prototype.findPlayerById = function(id) {
  var i = 0, max = this.players.length;
  for (; i < max; i++) {
    if (this.players[i].id === id)
      return this.players[i];
  }
  return false;
}

// Game.prototype.removePlayer = function(playerID) {
//   this.players.removeElement(playerID);
// };

// Game.prototype.removePlayerByUsername = function(username) {
//   var i;

//   console.log("searching for " + username);

//   for(i = 0; i < this.players.length; i++) {
//     console.log("searching");
//     if (this.players[i].username === username) {
//       console.log("found!");
//     }
//   }
// };

// Array.prototype.removeElement = function(id) {
//   if(this.indexOf(id) != -1) {
//     this.splice(this.indexOf(value), 1);
//   }
// }

module.exports = Game;