var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');

var models = require('../models');
var parse = require('../parsing/parseFeedDataToPodcastModel');

describe('parsing-xml-to-episode-models-large', function () {
	//this.timeout(60000);

  var episodes, parseFinished, parseStarted, podcast;

  before(function (done) {

		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true })
		]);

		fs.readFile(path.resolve(__dirname, './The_Ventura_Vineyard_Podcast.xml'), 'utf8', async function (err, data) {
			if (err) throw err;

      parseStarted = new Date();

			podcast = await parse(data); 
      parseFinished = new Date();
      podcast.getEpisodes().then(function (allEpisodes) {
        episodes = allEpisodes;	
        done();
      });
		});
  });

	it('episode count', function () {
		assert.strictEqual(episodes.length, 491);
	});

	it('parse time', function () {
		assert.isBelow(parseFinished - parseStarted, 1000);
	});

})
