import { promises as fsp } from 'fs';
import path from 'path';
import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';
import { ParseFeedDataToPodcastModel } from '../parsing/parseFeedDataToPodcastModel';

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-xml-to-episode-models-pla', () => {
	//this.timeout(60000);
	let assert: Chai.AssertStatic;

  	let episodes: Episode[];
  	let firstEpisode: Episode;
	let parseFinished: Date;
	let parseStarted: Date;
	let podcast: Podcast;

	before(async () => {
		
		assert = await ChaiWrapper.importAssert();

		const data: any = await fsp.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8');
			
		parseStarted = new Date();

		podcast = await parser.parse(data); 
		parseFinished = new Date();
		episodes = await podcast.getEpisodes();

		if (episodes[0] !== undefined) {
			firstEpisode = episodes[0];
		}
	});

	it('episode 0 description', () => {
		assert.strictEqual(firstEpisode.description, "This is a live show that happened on Sunday afternoon where me and Carlito climbed into the corporate PLA helicopter to fly around…");
	});

	it('episode 0 enclosure type', function () {
		assert.strictEqual(firstEpisode.enclosureType, "audio/mpeg");
	});

	it('episode 0 enclosure url', function () {
		assert.strictEqual(firstEpisode.enclosureUrl, "http://media.blubrry.com/phonelosers/snowplowshow.com/episodes/2018-10-14_TSPS504_Helicopter_Rides_With_Brad_and_Carlito_LQ.mp3");
	});

	it('episode 0 fileSize', function () {
		assert.strictEqual(firstEpisode.fileSize, 69923821);
	});

	it('episode 0 guid', function () {
		assert.strictEqual(firstEpisode.guid, "http://snowplowshow.com/?p=844");
	});

	it('episode 0 image', function () {
		assert.strictEqual(firstEpisode.imageUrl, undefined);
	});

	it('episode 0 published', function () {
		assert.equalDate(firstEpisode.published, new Date("2018-10-16 15:03:22"));
	});

	it('episode 0 title', function () {
		assert.strictEqual(firstEpisode.title, "TSPS Episode 504 – Helicopter Rides With Brad and Carlito");
	});
	
	it('episode count', function () {
		assert.strictEqual(episodes.length, 5);
	});

	it('parse time', function () {
		assert.isBelow(Math.abs(parseFinished.getTime() - parseStarted.getTime()), 1000);
	});

})
