var express = require('express');
var path = require('path');
var open = require('open');

import webpack from 'webpack';
import config from '../webpack.config.dev'

/* eslint-disable no-console*/

var port = 3000;
var app = express();
var compiler = webpack(config);


app.get("/users",function(req,res){
  //Hardcoding an API call result for testing. Pretend this is hitting a real database
  res.json([
    {"id":1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id":2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id":3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'../src/index.html'));
});

app.listen(port, function(err){
  if (err){
    console.log(err);
  }
  else{
    open('http://localhost:node'+port);
  }
});
