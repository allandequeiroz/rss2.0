Package.describe({
  name: 'allandequeiroz:rss2.0',
  version: '0.0.1',
  summary: 'An RSS 2.0 exporter for Meteor.',
  git: 'https://github.com/allandequeiroz/rss2.0.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['meteor', 'webapp', 'check'], 'server');
  api.addFiles('rss2.0.js','server');
  api.export('RSS', 'server');

});

Npm.depends({'xml2js': '0.4.8'});

Package.onTest(function(api) {
  api.use(['tinytest', 'http', 'random'], 'server');
  api.use('allandequeiroz:rss2.0');
  api.addFiles('rss2.0-tests.js', 'server');
});
