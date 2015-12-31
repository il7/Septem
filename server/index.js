require('babel-register')({
  presets: ['es2015', 'react']
});

require('babel-polyfill');

const _ = require('lodash');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const queryData = require('./query-data.js');

var app = express();

app.engine('mustache', mustacheExpress());

app.set('views engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// serve static assets normally
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/api', apiRequest)
app.get('/api/:name', apiRequest)

function apiRequest(req, res) {
  res.type('json');

  // create artificial network latency
  // to test ui loading behavvior 
  setTimeout(output, _.random(40, 500));
  // output();

  function output() {
    var result = { query: req.query };

    queryData(req.params.name, req.query)
      .then(function(data) {
        result.status = 200;
        result.results = data;
        res.send(result);
      })
      .catch(function(err) {
        Object.assign(result, err);
        res.send(result);
      });
  }
}

// serve all files to index (front end app will take over)
app.get('*', function (req, res) {
  res.type('html');
  res.status(200);
  res.render('index.mustache', {});
});

app.listen(process.env.PORT || 8080);

console.log("server started on port " + (process.env.PORT || 8080));