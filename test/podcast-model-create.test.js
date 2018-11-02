var assert = require('chai').assert;
var Bluebird = require('bluebird');
var fs = require('fs');
var path = require('path');

var models = require('../models');
var parse = require('../parse');

describe('models/podcast', function () {

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
				done();
			});
		});
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Podcast.destroy({ truncate: true }),
		]);
  });

	describe('create', function () {
		it('creates a podcast', function () {
			return models.Podcast.create({ title: 'Phone Losers of America', RssUrl: 'http://www.phonelosers.org/feed/', ParsedFeedCache: parsedFile }).bind(this).then(function (podcast) {
				assert.strictEqual(podcast.title, 'Phone Losers of America');
				assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
				assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
				assert.strictEqual(podcast.LastChecked.getHours(), new Date().getHours());
				assert.strictEqual(podcast.LastUpdated.getHours(), new Date().getHours());
			});
		});
	});

});
