socket = io.connect('http://rainbot.info/shoutout')
var connected = false;
var view      = $('#view');

socket.on('connect', function(data) {
  socket.emit('last-20', {});
});

socket.on('last-20', function(data) {
  for (let msg in data.msgs) {
    displayMessage(data.msgs[msg], $('#messages'));
  }
  connected = true;
});

socket.on('shout', function(data) {
  if (connected) {
    displayMessage(data, $('#messages'));
  }
});

function displayMessage(data, el) {
  var canScroll = false;

  if (view.innerHeight() + view.scrollTop() >= view[0].scrollHeight) {
    canScroll = true;
  }

  el.append(
    '<message><name>' + data.from + '</name>' +
    '<text>' + data.msg + '</text></message><br/>'
  );

  if (canScroll) {
    console.log('isbottom');
    view.animate({
      scrollTop: el[0].scrollHeight
    }, 1);
  }
}
