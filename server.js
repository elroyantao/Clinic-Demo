require('babel-register')({
  presets: ['es2015']
});
require("babel-polyfill");


var app = require('./app');

app.start();
