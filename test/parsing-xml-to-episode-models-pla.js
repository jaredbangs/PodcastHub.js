var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');
var timezone_mock = require('timezone-mock');

var models = require('../models');
var parse = require('../parsing/parseFeedDataToPodcastModel');

describe('parsing-xml-to-episode-models-pla', function () {
	this.timeout(60000);

  var episodes, podcast;

  before(function (done) {

		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true })
		]);

		fs.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8', function (err, data) {
			if (err) throw err;
			parse(data, function (err, podcastModel) {
				if (err) throw err;
				podcast = podcastModel;
				podcast.getEpisodes().then(function (allEpisodes) {
					episodes = allEpisodes;	
					done();
				});
			});
		});
  });

	/*
		it('episode 0 categories', function () {
			assert.strictEqual(podcast.episodes[0].categories.length, 1);
			assert.strictEqual(podcast.episodes[0].categories[0], "Snow Plow Show");
		});
	*/

	it('episode 0 description', function () {
		assert.strictEqual(episodes[0].description, "This is a live show that happened on Sunday afternoon where me and Carlito climbed into the corporate PLA helicopter to fly around…");
	});

	it('episode 0 duration', function () {
		assert.strictEqual(episodes[0].duration, undefined);
	});

	it('episode 0 enclosure type', function () {
		assert.strictEqual(episodes[0].enclosureType, "audio/mpeg");
	});

	it('episode 0 enclosure url', function () {
		assert.strictEqual(episodes[0].enclosureUrl, "http://media.blubrry.com/phonelosers/snowplowshow.com/episodes/2018-10-14_TSPS504_Helicopter_Rides_With_Brad_and_Carlito_LQ.mp3");
	});

	it('episode 0 fileSize', function () {
		assert.strictEqual(episodes[0].fileSize, 69923821);
	});

	it('episode 0 guid', function () {
		assert.strictEqual(episodes[0].guid, "http://snowplowshow.com/?p=844");
	});

	it('episode 0 image', function () {
		assert.strictEqual(episodes[0].image, undefined);
	});

	it('episode 0 published', function () {
		timezone_mock.register('UTC');
		assert.equalDate(episodes[0].published, new Date("2018-10-16 15:03:22").d);
		timezone_mock.unregister();
	});

	it('episode 0 title', function () {
		assert.strictEqual(episodes[0].title, "TSPS Episode 504 – Helicopter Rides With Brad and Carlito");
	});
	
	it('episode count', function () {
		assert.strictEqual(episodes.length, 5);
	});

})
