var Game   = require("./Game");
var Player = require("./Player");

var express = require('express');
var app     = express();
var server  = app.listen(8000);
var io      = require('socket.io').listen(server, { log: false });

var socket;

var gameSettings = {
  pitchWidth: 800,
  pitchLength: 400,
  playerSize: 20,
  ballSize: 10
}

function init() {
  var game = new Game();
  io.sockets.on('connection', function (socket) {
    io.sockets.emit('newConnection', game);
    socket.on('message', function (data) {
      console.log(data);
    });
    socket.on('addPlayer', function(username) {
      var newPlayer = new Player(username);
      game.addPlayer(username);
      io.sockets.emit('newPlayer', [game.getGameState(), newPlayer] );
    });
    socket.on('remove local player', function(player) {
        game.removePlayerByUsername(player.name);
        io.sockets.emit('newGameState', game.getGameState());
    });
  });

  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/stylesheets'));
}

init();