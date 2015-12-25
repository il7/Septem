var Metalsmith = require('metalsmith');

var markdown = require('metalsmith-markdown');
var ignore = require('metalsmith-ignore');
var headings = require('metalsmith-headings');
var paths = require('metalsmith-paths');
var headingsId = require('metalsmith-headings-identifier');
var fileMetadata = require('metalsmith-filemetadata');
var hierarchy = require('metalsmith-hierarchy');
var extlinks = require('metalsmith-external-links');
var excerpts = require('metalsmith-excerpts');
var title = require('metalsmith-title');

var _ = require('lodash');
var cheerio = require('cheerio');

// use metalsmith to create a json blob
// of contents file
module.exports = new Metalsmith(__dirname)
  .clean(false)
  .source('pages')
  .destination('tmp')
  .use(ignore('**/.DS_Store'))
  .use(markdown())
  .use(headings({
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  }))
  .use(fileMetadata([
    { pattern: '**/*', metadata: {
      type: 'page'
    }}, 
    { pattern: 'articles/**/*', metadata: {
      type: 'article'
    }}, 
    { pattern: 'projects/**/*', metadata: {
      type: 'project'
    }}
  ]))
  .use(title())
  .use(paths())
  .use(extlinks({ domain: "il7.io" }))
  .use(headingsId())
  .use(function(f,m,d) {
    for(var filename in f) {
      var file = f[filename];
      var $ = cheerio.load(file.contents.toString());
      
      file.excerpt = $('p').first().text();
      file.slug = file.path.name;
      file.date = file.date || file.stats.mtime
      file.modified = file.stats.mtime;
    }

    d()
  })