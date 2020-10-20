require('dotenv').config;
const express = require('express'),
      massive = require('massive'),
      app = express();

app.use(express.json());

app.listen(4000, console.log('Listening on Port 4000'))