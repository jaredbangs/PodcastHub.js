/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));
var fs = require('fs');
var path = require('path');

var models = require('../models');
*/

import { ParseFeedDataToPodcastModel } from "../parsing/parseFeedDataToPodcastModel";

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-xml-to-episode-models-pla', () => {
	//this.timeout(60000);

	let episodes, parseFinished, parseStarted, podcast;

	before((done: any) => {

	/*
		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true })
		]);
		*/

		fs.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8', async (err: any, data: any) => {
			
			if (err) throw err;

			parseStarted = new Date();

			podcast = await parser.parse(data); 
			parseFinished = new Date();
			podcast.getEpisodes().then((allEpisodes) => {
				episodes = allEpisodes;	
				done();
			});
		});
	});

	it('episode 0 description', () => {
		assert.strictEqual(episodes[0].description, "This is a live show that happened on Sunday afternoon where me and Carlito climbed into the corporate PLA helicopter to fly around…");
	});

	it('episode 0 duration', () => {
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
		assert.equalDate(episodes[0].published, new Date("2018-10-16 15:03:22"));
	});

	it('episode 0 title', function () {
		assert.strictEqual(episodes[0].title, "TSPS Episode 504 – Helicopter Rides With Brad and Carlito");
	});
	
	it('episode count', function () {
		assert.strictEqual(episodes.length, 5);
	});

	it('parse time', function () {
		assert.isBelow(parseFinished - parseStarted, 500);
	});

})
