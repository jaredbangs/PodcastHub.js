let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

import { promises as fsp } from 'fs';
import path from 'path';

import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';
import { ParseFeedDataToPodcastModel } from '../parsing/parseFeedDataToPodcastModel';

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-xml-to-episode-models-large', () => {
	//this.timeout(60000);

  	let episodes: Episode[];
	let parseFinished: Date;
	let parseStarted: Date;
	let podcast: Podcast;

  	before(async () => {

		await Episode.destroyAll();
		await Podcast.destroyAll();
		
		const data: any = await fsp.readFile(path.resolve(__dirname, './The_Ventura_Vineyard_Podcast.xml'), 'utf8');

		parseStarted = new Date();

		podcast = await parser.parse(data); 
		parseFinished = new Date();
		
		episodes = await podcast.getEpisodes();
  	});

	it('episode count', () => {
		assert.strictEqual(episodes.length, 491);
	});

	it('parse time', () => {
		assert.isBelow(Math.abs(parseFinished.getTime() - parseStarted.getTime()), 1000);
	});

})
