import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { Podcast } from '../models/podcast';
import { PodcastRepository } from '../repositories/podcastRepository';

describe('repositories-podcast', function () {

	let assert: Chai.AssertStatic;

	let plaPodcastId: string;
	
	const repository = new PodcastRepository();
	
	before(async () => {
		assert = await ChaiWrapper.importAssert();
		
		await repository.deleteAll();
		
		const p = await Podcast.create('Phone Losers of America', 'http://www.phonelosers.org');
		p.author = 'Jared';
		p.descriptionLong = 'Long';
		p.descriptionShort = 'Short';
		p.image = 'image 1';
		p.language = 'en-us';
		p.link = 'http://www.phonelosers.org';
		p.title = 'Phone Losers of America';
		p.LastUpdated = new Date("2018-10-16 15:03:22");
		p.ParsedFeedCache = { author: 'Jared' };

		plaPodcastId = p._id;

		await repository.save(p);

		const p2 = await Podcast.create('This American Life');
		await repository.save(p2);
		
	});

	it('database name', async () => {
		assert.strictEqual(repository.DatabaseName, "db_test_podcasts");
	});
	
	describe("findByTitle", async () => {
		
		let results: Podcast[];
		let plaPodcast: Podcast;

		beforeEach(async () => {
			
			results = await repository.findByTitle("Phone Losers of America");
			if (results.length > 0 && results[0] !== undefined){
				plaPodcast = results[0];
			}
		});

		it('count', async () => {
			assert.strictEqual(results.length, 1);
		});

		it('first parsed feed cache', () => {
			assert.strictEqual(plaPodcast.ParsedFeedCache.author, 'Jared');
		});

		it('first entry author', () => {
			assert.strictEqual(plaPodcast.author, 'Jared');
		});
		
		it('first entry descriptionLong', () => {
			assert.strictEqual(plaPodcast.descriptionLong, 'Long');
		});
		
		it('first entry descriptionShort', () => {
			assert.strictEqual(plaPodcast.descriptionShort, 'Short');
		});
		
		it('first entry image', () => {
			assert.strictEqual(plaPodcast.image, 'image 1');
		});
		
		it('first entry language', () => {
			assert.strictEqual(plaPodcast.language, 'en-us');
		});
		
		it('first entry link', () => {
			assert.strictEqual(plaPodcast.link, 'http://www.phonelosers.org');
		});
		
		it('first entry title', () => {
			assert.strictEqual(plaPodcast.title, 'Phone Losers of America');
		});
		
		it('first entry LastUpdated type', () => {
			assert.strictEqual(typeof(plaPodcast.LastUpdated), "object");
		});

		it('first entry LastUpdated', () => {
			assert.deepEqual(plaPodcast.LastUpdated, new Date("2018-10-16 15:03:22"));
		});
	});

	describe("load", async () => {
		
		let plaPodcast: Podcast;

		beforeEach(async () => {
			plaPodcast = await repository.load(plaPodcastId);
		});

		it('first parsed feed cache', () => {
			assert.strictEqual(plaPodcast.ParsedFeedCache.author, 'Jared');
		});

		it('first entry author', () => {
			assert.strictEqual(plaPodcast.author, 'Jared');
		});
		
		it('first entry descriptionLong', () => {
			assert.strictEqual(plaPodcast.descriptionLong, 'Long');
		});
		
		it('first entry descriptionShort', () => {
			assert.strictEqual(plaPodcast.descriptionShort, 'Short');
		});
		
		it('first entry image', () => {
			assert.strictEqual(plaPodcast.image, 'image 1');
		});
		
		it('first entry language', () => {
			assert.strictEqual(plaPodcast.language, 'en-us');
		});
		
		it('first entry link', () => {
			assert.strictEqual(plaPodcast.link, 'http://www.phonelosers.org');
		});
		
		it('first entry title', () => {
			assert.strictEqual(plaPodcast.title, 'Phone Losers of America');
		});
		
		it('first entry LastUpdated type', () => {
			assert.strictEqual(typeof(plaPodcast.LastUpdated), "object");
		});

		it('first entry LastUpdated string', () => {
			assert.deepEqual(plaPodcast.lastUpdated_ISOString, "2018-10-16T22:03:22.000Z");
		});

		it('first entry LastUpdated', () => {
			assert.deepEqual(plaPodcast.LastUpdated, new Date("2018-10-16 15:03:22"));
		});
	});
	
	describe("loadAll", async () => {
		
		let podcasts: Podcast[];
		
		beforeEach(async () => {
			podcasts = await repository.loadAll();
		});

		it('count', async () => {
			assert.strictEqual(podcasts.length, 2);
		});
	
	});
})
