const _ = require('lodash');
const params = require('query-params');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const queryData = require('./query-data.js');

// serve static assets normally
app.use(express.static(__dirname + '/../dist'));

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
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
});

app.listen(port);

console.log("server started on port " + port);