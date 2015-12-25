// merge / update database with new content
// 1. build json output of markdown files using metalsmith
// 2. iterate over output and insert new documents couch
// 3. accept() promise

var metal = require('./metalfile.js');
var _ = require('lodash');

var couch = process.env.COUCH_DB || 'http://localhost:5984';
var nano = require('nano')(couch);
var JSONStream = require('JSONStream');

var pages = nano.use('il7-pages');


metal.build(function(err, files) {
  if (err) throw err;
  updatePages(files);
});

function updatePages(files) {
  _.map(files, filterPage)
    // .map(flattenBuffer)
    .forEach(updatePage);
}

function updatePage(file) {
  pages.get(file.slug, function (error, existing) { 
    var datestr = (new Date(file.modified)).toISOString()
    var emod = existing && existing.modified;
    
    if (!error) file._rev = existing._rev;
    if (datestr !== emod) {
      console.log('updating/inserting - ' + file.slug);
      pages.insert(file, file.slug, function(err) {
        if (err) throw err;
      });
    }
  });
}

function flattenBuffer(file) {
  file.contents = file.contents.toString();
  return file;
}

function filterPage(file) {
  return _.omit(file, 'mode', 'stats', 'path');
}