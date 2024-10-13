import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

describe('orm-model-podcast', function () {

	before(async () => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
	});

	let plaPodcast: Podcast;

	beforeEach(async () => {
		
		await Episode.destroyAll();
		await Podcast.destroyAll();
		
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

		await Podcast.create('This American Life');
		
		plaPodcast = await Podcast.findOne({ where: { title: 'Phone Losers of America' }});
	});

	it('count', async () => {
		const podcasts: Podcast[] = await Podcast.findAll();
		assert.strictEqual(podcasts.length, 2);
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
	
	it('first entry LastUpdated', () => {
		assert.equalDate(plaPodcast.LastUpdated, new Date("2018-10-16 15:03:22"));
	});

})
