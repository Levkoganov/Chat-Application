// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const createError = require('http-errors');
const socketio = require('socket.io');
const chat = require('./routes/chat');

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// chat router
app.use('/', chat);

// SOCKET
const server = require('http').createServer(app);
const io = socketio(server);
const users = {};

// Create Socket Connection
io.on('connection', (socket) => {
  // Send username
  socket.on('new-user', (name) => {
    users[socket.id] = name;
    io.sockets.emit('user-connected', name);
  });
  // Send username+message
  socket.on('send-chat-msg', (msg) => {
    io.sockets.emit('chat-message', { msg, user: users[socket.id] });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server };
