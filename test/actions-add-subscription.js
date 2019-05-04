var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));

var fetchRssFile = require('../actions/fetchRssFile');
var models = require('../models');
var addSubscription = require('../actions/addSubscription');

var fetchRss = function () {
	return fetchRssFile('data-pla.xml');
}

describe('actions-add-subscription', function () {
	
	//this.timeout(30000);

  var podcast;

  before(function (done) {

		Bluebird.all([
			models.sequelize.sync(),
      //models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);

		addSubscription('http://www.phonelosers.org/feed/', { fetchRss: fetchRss }, function (err, podcastModel) {
			if (err) throw err;
			podcast = podcastModel;
			done();
		});
  });
  
	it('model is saved', function () {
    assert.notEqual(podcast.id, 0);
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
    assert.equalDate(podcast.LastUpdated, new Date("2018-10-16 15:03:22"));
  });
})
