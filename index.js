const Parser = require('rss-parser'),
      cheerio = require('cheerio');
 
(async () => {

    let parser = new Parser();
    let links = []

    let ignoredLinks = [
        'http://www.loopmatinal.com/',
        'mailto:comercial@loopinfinito.net', 
        'https://www.twitter.com/mvcmendes',
        'https://www.youtube.com/oloopinfinito'
    ]

    let feed = await parser.parseURL('http://loopmatinal.libsyn.com/rss');
    console.log(feed.title);
   
    let lastFeedItem = feed.items[0]

    const $ = cheerio.load(lastFeedItem.content,  {
        normalizeWhitespace: true
    })

   $('a').each(function(i, el) {
       links.push($(this).attr('href'))
   })

   links = links.filter(a => ignoredLinks.indexOf(a) === -1)
    
   console.log(links);
   
})();