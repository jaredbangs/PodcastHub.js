var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');
var timezone_mock = require('timezone-mock');

var models = require('../models');
var parse = require('../parseFeedDataToPodcastModel');

describe('Parse sample feed to model', function () {

  var podcast;

  before(function (done) {

		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);

		fs.readFile(path.resolve(__dirname, './phonelosers.org.xml'), 'utf8', function (err, data) {
			if (err) throw err;
			parse(data, function (err, podcastModel) {
				if (err) throw err;
				podcast = podcastModel;
				done();
			});
		});
  });
  
	it('author', function () {
    assert.strictEqual(podcast.author, "RedBoxChiliPepper");
  });
/*  
  it('categories', function () {
    assert.strictEqual(podcast.categories.length, 3);
    assert.strictEqual(podcast.categories[0], "Comedy");
  });
*/  
  it('copyright', function () {
    assert.strictEqual(podcast.copyright, undefined);
  });

  it('description long', function () {
    assert.strictEqual(podcast.descriptionLong, 'home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', function () {
    assert.strictEqual(podcast.descriptionShort, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('image', function () {
    assert.strictEqual(podcast.image, 'http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', function () {
    assert.strictEqual(podcast.language, 'en-us');
  });
  
	it('link', function () {
    assert.strictEqual(podcast.link, 'http://www.phonelosers.org');
  });

  it('title', function () {
    assert.strictEqual(podcast.title, 'Phone Losers of America');
  });
  
	it('updated', function () {
		timezone_mock.register('UTC');
    assert.equalDate(podcast.LastUpdated, new Date("2018-10-16 15:03:22").d);
		timezone_mock.unregister();
  });
})
