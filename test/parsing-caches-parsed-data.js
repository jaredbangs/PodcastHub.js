var assert = require('chai').assert;
var Bluebird = require('bluebird');
var fs = require('fs');
var path = require('path');

var models = require('../models');
var parse = require('../parsing/parseFeedDataToJSON');

describe('parsing-caches-parsed-data', function () {

	//this.timeout(60000);

  var parsedFile;
  
	before(function (done) {

		Bluebird.all([
			models.sequelize.sync()
		]);
		
		fs.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8', async function (err, data) {

			if (err) throw err;

      parsedFile = await parse(data); 
				
      Bluebird.all([
        models.Episode.destroy({ truncate: true }),
        models.Podcast.destroy({ truncate: true }),
        models.Podcast.create({ title: 'parsing-caches-parsed-data', RssUrl: 'http://www.phonelosers.org/feed/', ParsedFeedCache: parsedFile }),
        done()
      ]);
		});
  });
	
	it('creates a podcast', function () {
		return models.Podcast.findOne({ where: { title: 'parsing-caches-parsed-data' }}).then(function (podcast) {
			assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
		});
	});

});
