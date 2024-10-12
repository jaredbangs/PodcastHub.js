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

describe('parsing-xml-to-episode-models-large', () => {
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
		fs.readFile(path.resolve(__dirname, './The_Ventura_Vineyard_Podcast.xml'), 'utf8', async (err: any, data: any) => {
			if (err) throw err;

			parseStarted = new Date();

			podcast = await parser.parse(data); 
			parseFinished = new Date();
			podcast.getEpisodes().then((allEpisodes: any) => {
				episodes = allEpisodes;	
				done();
			});
		});
  	});

	it('episode count', () => {
		assert.strictEqual(episodes.length, 491);
	});

	it('parse time', () => {
		assert.isBelow(parseFinished - parseStarted, 1000);
	});

})
