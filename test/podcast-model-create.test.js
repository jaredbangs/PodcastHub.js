var assert = require('chai').assert;
var Bluebird = require('bluebird');
var fs = require('fs');
var path = require('path');

var models = require('../models');
var parse = require('../parseFeedDataToJSON');

describe('podcast-model-create', function () {

	this.timeout(60000);

  var parsedFile;
  
	before(function (done) {

		Bluebird.all([
			models.sequelize.sync()
		]);
		
		fs.readFile(path.resolve(__dirname, './phonelosers.org.xml'), 'utf8', function (err, data) {

			if (err) throw err;
			parse(data, function (err, parsedData) {
				if (err) throw err;
				parsedFile = parsedData;
				Bluebird.all([
					models.Episode.destroy({ truncate: true }),
					models.Podcast.destroy({ truncate: true }),
					models.Podcast.create({ title: 'podcast-model-create', RssUrl: 'http://www.phonelosers.org/feed/', ParsedFeedCache: parsedFile }),
					done()
				]);
			});
		});
  });
	
	it('creates a podcast', function () {
		return models.Podcast.findOne({ where: { title: 'podcast-model-create' }}).then(function (podcast) {
			assert.strictEqual(podcast.title, 'podcast-model-create');
			assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
			assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
		});
	});

});
