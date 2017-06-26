const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express); // eslint-disable-line no-underscore-dangle

app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.render('home');
});

module.exports = app;
