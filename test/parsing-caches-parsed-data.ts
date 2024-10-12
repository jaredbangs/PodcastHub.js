/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');
var fs = require('fs');
var path = require('path');

var models = require('../models');
*/

// import { ParseFeedDataToJSON } from "../parsing/parseFeedDataToJSON";
// const parser = new ParseFeedDataToJSON();

describe('parsing-caches-parsed-data', () => {

	//this.timeout(60000);

	// let parsedFile: any;
  
	before((done) => {

		/*
		Bluebird.all([
			models.sequelize.sync()
		]);
		*/
		
		fs.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8', async (err: any) => { // data: any) => {

			if (err) throw err;

      		// parsedFile = await parser.parse(data); 
			
			/*
				Bluebird.all([
					models.Episode.destroy({ truncate: true }),
					models.Podcast.destroy({ truncate: true }),
					models.Podcast.create({ title: 'parsing-caches-parsed-data', RssUrl: 'http://www.phonelosers.org/feed/', ParsedFeedCache: parsedFile }),
					done()
				]);*/
			done();
		});
  	});
	
	it('creates a podcast', () => {
		return models.Podcast.findOne({ where: { title: 'parsing-caches-parsed-data' }}).then((podcast) => {
			assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
		});
	});

});
