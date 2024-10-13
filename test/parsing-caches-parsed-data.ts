import { promises as fsp } from 'fs';
import path from 'path';
import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { Episode } from '../models/episode';
import { PodcastRepository } from '../repositories/podcastRepository';
import { ParseFeedDataToPodcastModel } from '../parsing/parseFeedDataToPodcastModel';

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-caches-parsed-data', () => {

	let assert: Chai.AssertStatic;
	//this.timeout(60000);

	let podcastId: string;

	const repository = new PodcastRepository();
  
	before(async () => {
		
		assert = await ChaiWrapper.importAssert();
		
		await Episode.destroyAll();
		await repository.deleteAll();
	
		const data: any = await fsp.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8');

		const podcast = await parser.parse(data); 
		podcastId = podcast._id;
		await repository.save(podcast);
	});
	
	it('reloaded podcast has expected parsedfeedcache data', async () => {
		const podcast = await repository.load(podcastId);
		assert.strictEqual(podcast.author, "RedBoxChiliPepper");
		assert.strictEqual(podcast.ParsedFeedCache.author, "RedBoxChiliPepper");
	});

});
