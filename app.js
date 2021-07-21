'use strict';
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });
const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
console.log(__dirname);

app.set('view engine', 'hbs');

db.connect(error => {
  if (error) {
    console.log('my sql not connected');
  } else {
    console.log('my sql connected');
  }
});
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use(express.static('images'));
//define routes

app.listen(5001, () => {
  console.log('Server started at port 5001');
});
