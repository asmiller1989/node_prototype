// Imports
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var morgan = require('morgan');
//var mongodb = require('mongodb');
//var mongoose = require('mongoose');
var mysql = require('mysql');
var endpoints = require('./routes/endpoints.js');
var models = require('./models');

// Call setup process
setup();

// Initialize node process
function setup(){
  
  var app = express();

  function configure_mc(app) {
    app.use(morgan('dev'));
    app.use(express.bodyParser());
  }
  // allow CORS for development
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  };

  app.use(allowCrossDomain);
  configure_mc(app);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //ENDPOINTS
  app.get('/test', endpoints.test)
  app.get('/create_deals', endpoints.create_deals)
  app.get('/create_sql_deals', endpoints.create_sql_deals)
  app.post('/get_deals', endpoints.get_deals)
  app.get('/make_purchase/:price', endpoints.make_purchase)
  app.get('/create_deal', endpoints.create_deal)
  app.get('/create_price_set', endpoints.create_price_set)

  module.exports = app;
  http.createServer(app).listen(80, function(){console.log('node listening on port 80')})
}
