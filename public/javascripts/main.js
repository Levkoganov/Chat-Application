const socket = io('http://localhost:3000/');
socket.on('connection');

// output username
socket.on('user-connected', (user) => {
  displayInput(`${user} joined the room!`);
});

// output the username message
socket.on('chat-message', (msg) => {
  displayInput(`${msg.user}: ${msg.msg}`);
});

// username BTN
const username = () => {
  const input = document.getElementById('input').value;
  const usernameBtn = document.getElementById('name');
  const messageBtn = document.getElementById('msg');

  usernameBtn.style.display = 'none';
  messageBtn.style.display = 'block';
  socket.emit('new-user', input);
  $('input[type="text"]').val(''); // Clear input value
};

// message BTN
const message = () => {
  const input = document.getElementById('input').value;
  socket.emit('send-chat-msg', `${input}`);
  $('input[type="text"]').val(''); // Clear input value
};

const displayInput = (msg) => {
  $('[name=chat]').html(
    $('[name=chat]').html() + $('[type=text]').val() + msg + '\n'
  );
};
