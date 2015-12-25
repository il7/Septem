var couch = process.env.COUCH_DB || 'http://localhost:5984';
var nano = require('nano')(couch);
var JSONStream = require('JSONStream');

var pages = nano.use('il7-pages');

module.exports = function(type, query) {
  var view = getView(type);

  return new Promise(function(resolve, reject) {
    var result = [];
    pages.view(view.design, view.view, query)
      .on('error', reject)
      .pipe(JSONStream.parse(view.parse))
      .on('data', data => result.push(data))
      .on('end', () => {
        if (result.length > 0) {
          resolve(query.single == 'true' ? result[0] : result);
        } else {
          reject({
            errorCode: '404',
            error: 'Not Found'
          })
        }
      });
  });
}

function getView(type) { 
  switch(type) {
    case 'articles': return { design: 'pages', view: 'all-articles', parse: 'rows.*.value' };
    case 'open-source': return { design: 'pages', view: 'all-projects', parse: 'rows.*.value' };
    default: return { design: 'pages', view: 'all-pages', parse: 'rows.*.value' };
  }
}