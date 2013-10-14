var Game   = require("./Game");

var express = require('express');
var app     = express();
var server  = app.listen(8000);
var io      = require('socket.io').listen(server, {log: false});

var socket;

/* Create the game settings */
var gameSettings = {
  pitchWidth: 1620,
  pitchLength: 900,
  playerSize: 20,
  ballSize: 10
}

function init() {

  /* Create a new game */
  var game = new Game(gameSettings.pitchWidth, gameSettings.pitchLength);

  /* When a client connects to the server */
  io.sockets.on('connection', function (socket) {

    // console.log(socket.id);
    var clientID = socket.id;

    /* When a new player message is received from a client... */
    socket.on('add player', function(x, y) {

      /* ...add a new player to the game */
      game.addPlayer(clientID, x, y);

      /* Emit a new player message to all clients */
      io.sockets.emit('new player', {id: clientID, x: x, y: y, players: game.players} );
    });

    socket.on('update player', function(data) {
      var player = game.findPlayerById(clientID);
      player.position.x = data.x;
      player.position.y = data.y;
      io.sockets.emit('update player', player);
    });
  });

  /* Point to public directories for clients */
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/stylesheets'));
}

init();