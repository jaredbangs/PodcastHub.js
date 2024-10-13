import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
  
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

describe('orm-association-podcast-episode', function () {

	let matchingEpisode: Episode;
	let nonMatchingEpisode: Episode;
	let podcastId: string;

	before(async () => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
  	});

  	beforeEach(async () => {

		await Episode.destroyAll();
		await Podcast.destroyAll();
		
		const podcast = await Podcast.create('podcast-with-episode', 'http://www.phonelosers.org/feed/');
		podcastId = podcast.id;
		
		await podcast.createEpisode('Episode 1', 'abcdefg'); 
		matchingEpisode = await Episode.create('abcdefg');
		nonMatchingEpisode = await Episode.create('mnop');
	});

	it('reads a podcast with an episode', async () => {
		
		const podcast = await Podcast.loadById(podcastId);
		
		assert.strictEqual(podcast.title, 'podcast-with-episode');
		assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
		
		const episodes: Episode[] = await podcast.getEpisodes();
		assert.strictEqual(episodes.length, 1);
		const firstEpisode = episodes[0];
		assert.isDefined(firstEpisode);
		assert.strictEqual(firstEpisode.title, 'Episode 1');
	});

	it('has matching episode', async () => {
		const podcast = await Podcast.loadById(podcastId);
		const hasEpisode = await podcast.hasMatchingEpisode(matchingEpisode);
		assert.isTrue(hasEpisode);
	});

	it('does not have matching episode', async () => {
		const podcast = await Podcast.loadById(podcastId);
		const hasEpisode = await podcast.hasMatchingEpisode(nonMatchingEpisode);
		assert.isFalse(hasEpisode);
	});

	it('has episode by guid', async () => {
		const podcast = await Podcast.loadById(podcastId);
		const hasEpisode = await podcast.hasEpisodeByGuid('abcdefg');
		assert.isTrue(hasEpisode);
	});

	it('does not have episode by guid', async () => {
		const podcast = await Podcast.loadById(podcastId);
		const hasEpisode = await podcast.hasEpisodeByGuid('mnop');
		assert.isFalse(hasEpisode);
	});
});
