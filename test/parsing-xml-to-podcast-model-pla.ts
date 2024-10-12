
/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');
*/

import { ParseFeedDataToPodcastModel } from "../parsing/parseFeedDataToPodcastModel";
// var models = require('../models');

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-xml-to-podcast-model-pla', () => {
	
	//this.timeout(30000);

  let podcast: any = undefined;

  before((done: any) => {

    /*
		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);
    */

		fs.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8', async (err: any, data: any) => {
			if (err) throw err;
      podcast = await parser.parse(data);
      done();
		});
  });
  
	it('author', () => {
    assert.strictEqual(podcast.author, "RedBoxChiliPepper");
  });
/*  
  it('categories', function () {
    assert.strictEqual(podcast.categories.length, 3);
    assert.strictEqual(podcast.categories[0], "Comedy");
  });
*/  
  it('copyright', () => {
    assert.strictEqual(podcast.copyright, undefined);
  });

  it('description long', () => {
    assert.strictEqual(podcast.descriptionLong, 'home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', () => {
    assert.strictEqual(podcast.descriptionShort, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('image', () => {
    assert.strictEqual(podcast.image, 'http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', () => {
    assert.strictEqual(podcast.language, 'en-us');
  });
  
	it('link', () => {
    assert.strictEqual(podcast.link, 'http://www.phonelosers.org');
  });

  it('title', () => {
    assert.strictEqual(podcast.title, 'Phone Losers of America');
  });
  
	it('updated', () => {
    assert.equalDate(podcast.LastUpdated, new Date("2018-10-16 15:03:22"));
  });
})
