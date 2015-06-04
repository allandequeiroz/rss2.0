var parseString = Meteor.wrapAsync(Npm.require('xml2js').parseString);

var posts = [
  {
    title: "Post One.",
    link: "http://rss20/postone",
    description: "Post one about RSS20"
  },
  {
    title: "Post Two.",
    link: "http://rss20/posttwo",
    description: "Post two about RSS20"
  },
];

function fetch(path) {
  var url = Meteor.absoluteUrl() + path;
  var res = HTTP.get(url);
  return res.content;
}

Tinytest.add('RSS2.0 Exporting test', function(test) {
  RSS.add('/rss', function() {
    RSS.context.channelTitle = "Allan de Queiroz";
    RSS.context.channelLink = "http://www.allandequeiroz.com";
    RSS.context.channelDescription = "My journey through Meteor";
    _.each(posts, function (post) {
      RSS.context.entries.push({
        title: post.title,
        link: post.link,
        description: post.description
      });
    });
  });

  var rss = fetch('rss');
  test.equal(rss,RSS.content);
});
