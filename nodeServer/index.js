// Node server which will handle socket io connections

const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  // If any new user joins, let other users connected to the server know!
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  // If someone sends a message, broadcast it to other people
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  // If someone leaves the chat, let others know
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

// const http = require('http'); // Require the HTTP module
// const server = http.createServer(); // Create an HTTP server

// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   },
// });

// const users = {};

// io.on('connection', socket => {
//   console.log('User connected:', socket.id);

//   socket.on('new-user-joined', name => {
//     users[socket.id] = name;
//     socket.broadcast.emit('user-joined', name);
//   });

//   socket.on('send', message => {
//     socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//   });

//   socket.on('disconnect', () => {
//     if (users[socket.id]) {
//       const disconnectedUser = users[socket.id];
//       delete users[socket.id];
//       socket.broadcast.emit('left', disconnectedUser);
//       console.log('User disconnected:', socket.id);
//     }
//   });
// });

// const port = 8000;
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
