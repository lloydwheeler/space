$(document).ready(function() {
  var server = "http://192.168.1.83:8000";
  var client = new Client(server);

  $('.button').click(function() {
    client.addPlayer($('.username').val());
    $('.join-game').fadeOut();
  });



  $('.remove-player').click(function(e) {
    e.preventDefault();
    client.removePlayer(client.player.username);
  });
});