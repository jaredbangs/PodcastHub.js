import { promises as fsp } from 'fs';
import path from 'path';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
	assert = c.assert;
});

import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';
import { ParseFeedDataToJSON } from "../parsing/parseFeedDataToJSON";

const parser = new ParseFeedDataToJSON();

describe('parsing-caches-parsed-data', () => {

	//this.timeout(60000);

	let parsedFile: any;
  
	before(async () => {

		/*
		Bluebird.all([
			models.sequelize.sync()
		]);
		*/
	
		const data: any = await fsp.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8');

		parsedFile = await parser.parse(data); 
			
		await Episode.destroyAll();
		await Podcast.destroyAll();
		const podcast = await Podcast.create('parsing-caches-parsed-data', 'http://www.phonelosers.org/feed/');
		podcast.ParsedFeedCache = parsedFile;
		await podcast.save();
	});
	
	it('creates a podcast', async () => {
		const podcast = await Podcast.findOne({ where: { title: 'parsing-caches-parsed-data' }});
		assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
	});

});
