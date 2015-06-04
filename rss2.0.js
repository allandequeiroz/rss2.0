var Fiber = Npm.require('fibers');
var clientUrl = undefined;

RSS = {
    content: '',
    context : {
        channelTitle:'',
        channelLink:'',
        channelDescription:'',
        entries:[]
    },
    xml : {
        header : '<?xml version="1.0"?>\n<rss version="2.0">',
        channelOpen: '<channel>',
        channelClose: '</channel>',
        titleOpen: '<title>',
        titleClose: '</title>',
        linkOpen: '<link>',
        linkClose: '</link>',
        descriptionOpen: '<description>',
        descriptionClose: '</description>',
        itemOpen: '<item>',
        itemClose: '</item>',
        footer: '</rss>'
    }
};
RSS.add = function(url,func) {
    "use strict";
    check(url, String);
    if (url.charAt(0) !== '/'){
        url = '/' + url;
    }
    clientUrl = url;
    func();
};

WebApp.connectHandlers.use(function(req, res, next) {
    new Fiber(function() {
        "use strict";

        if (clientUrl!==req.url) {
            return next();
        }

        var out = RSS.xml.header;
        out += RSS.xml.channelOpen;

        out += RSS.xml.titleOpen;
        out += RSS.context.channelTitle;
        out += RSS.xml.titleClose;

        out += RSS.xml.linkOpen;
        out += RSS.context.channelLink;
        out += RSS.xml.linkClose;

        out += RSS.xml.descriptionOpen;
        out += RSS.context.channelDescription;
        out += RSS.xml.descriptionClose;

        _.each(RSS.context.entries, function(entry) {
            out += RSS.xml.itemOpen;

            out += RSS.xml.titleOpen;
            out += entry.title;
            out += RSS.xml.titleClose;

            out += RSS.xml.linkOpen;
            out += entry.link;
            out += RSS.xml.linkClose;

            out += RSS.xml.descriptionOpen;
            out += entry.description;
            out += RSS.xml.descriptionClose;

            out += RSS.xml.itemClose;
        });

        out += RSS.xml.channelClose;
        out += RSS.xml.footer;

        RSS.content = out;

        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(out, 'utf8');
        return;
    }).run();
});