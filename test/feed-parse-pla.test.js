var assert = require('chai').assert;
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');
var timezone_mock = require('timezone-mock');

var parse = require('../parse');

describe('Parse sample feed', function () {

  var parsedFile;

  before(function (done) {

	fs.readFile(path.resolve(__dirname, './phonelosers.org.xml'), 'utf8', function (err, data) {

		if (err) throw err;
		parse(data, function (err, parsedData) {
			if (err) throw err;
			parsedFile = parsedData;
			done();
		});
	});
  });
  
  it('author', function () {
    assert.strictEqual(parsedFile.author, "RedBoxChiliPepper");
  });
 
  it('categories', function () {
    assert.strictEqual(parsedFile.categories.length, 3);
    assert.strictEqual(parsedFile.categories[0], "Comedy");
  });
  
  it('copyright', function () {
    assert.strictEqual(parsedFile.copyright, undefined);
  });

  it('description long', function () {
    assert.strictEqual(parsedFile.description.long, 'home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', function () {
    assert.strictEqual(parsedFile.description.short, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('episode 0 categories', function () {
    assert.strictEqual(parsedFile.episodes[0].categories.length, 1);
    assert.strictEqual(parsedFile.episodes[0].categories[0], "Snow Plow Show");
  });

  it('episode 0 description', function () {
    assert.strictEqual(parsedFile.episodes[0].description, "This is a live show that happened on Sunday afternoon where me and Carlito climbed into the corporate PLA helicopter to fly around…");
  });

  it('episode 0 duration', function () {
    assert.strictEqual(parsedFile.episodes[0].duration, undefined);
  });

  it('episode 0 enclosure filesize', function () {
    assert.strictEqual(parsedFile.episodes[0].enclosure.filesize, 69923821);
  });

  it('episode 0 enclosure type', function () {
    assert.strictEqual(parsedFile.episodes[0].enclosure.type, "audio/mpeg");
  });

  it('episode 0 enclosure url', function () {
    assert.strictEqual(parsedFile.episodes[0].enclosure.url, "http://media.blubrry.com/phonelosers/snowplowshow.com/episodes/2018-10-14_TSPS504_Helicopter_Rides_With_Brad_and_Carlito_LQ.mp3");
  });

  it('episode 0 guid', function () {
    assert.strictEqual(parsedFile.episodes[0].guid, "http://snowplowshow.com/?p=844");
  });

  it('episode 0 image', function () {
    assert.strictEqual(parsedFile.episodes[0].image, undefined);
  });
  
  it('episode 0 published', function () {
	timezone_mock.register('UTC');
    assert.equalDate(parsedFile.episodes[0].published, new Date("2018-10-16 15:03:22").d);
	timezone_mock.unregister();
  });

  it('episode 0 title', function () {
    assert.strictEqual(parsedFile.episodes[0].title, "TSPS Episode 504 – Helicopter Rides With Brad and Carlito");
  });

  it('episode count', function () {
    assert.strictEqual(parsedFile.episodes.length, 100);
  });

  it('image', function () {
    assert.strictEqual(parsedFile.image, 'http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', function () {
    assert.strictEqual(parsedFile.language, 'en-us');
  });

  it('link', function () {
    assert.strictEqual(parsedFile.link, 'http://www.phonelosers.org');
  });

  it('title', function () {
    assert.strictEqual(parsedFile.title, 'Phone Losers of America');
  });
  
  it('updated', function () {
	timezone_mock.register('UTC');
    assert.equalDate(parsedFile.updated, new Date("2018-10-16 15:03:22").d);
	timezone_mock.unregister();
  });
})
