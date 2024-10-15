import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';
import { PodcastRepository } from '../repositories/podcastRepository';

describe('orm-association-podcast-episode', function () {

	let assert: Chai.AssertStatic;
	
	const podcastRepository = new PodcastRepository();

	let matchingEpisode: Episode;
	let nonMatchingEpisode: Episode;
	let podcast: Podcast;

	before(async () => {

		assert = await ChaiWrapper.importAssert();

		await podcastRepository.deleteAll();
		
		const p = await Podcast.create('podcast-with-episode', 'http://www.phonelosers.org/feed/');
		const podcastId = p._id;

		matchingEpisode = new Episode();
		matchingEpisode.title = "Episode 1";
		
		nonMatchingEpisode = new Episode();
		nonMatchingEpisode.title = "Episode 2";

		p.episodes.push(matchingEpisode);

		podcastRepository.save(p);
		
		podcast= await podcastRepository.load(podcastId);
	});

	it('reads a podcast with an episode', async () => {
		
		assert.strictEqual(podcast.title, 'podcast-with-episode');
		assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
		
		const episodes: Episode[] = await podcast.getEpisodes();
		assert.strictEqual(episodes.length, 1);
		const firstEpisode = episodes[0];
		assert.isDefined(firstEpisode);
		assert.strictEqual(firstEpisode.title, 'Episode 1');
	});

	it('has matching episode', async () => {
		const hasEpisode = await podcast.hasEpisode(matchingEpisode);
		assert.isTrue(hasEpisode);
	});

	it('does not have matching episode', async () => {
		const hasEpisode = await podcast.hasEpisode(nonMatchingEpisode);
		assert.isFalse(hasEpisode);
	});

	it('has episode by guid', async () => {
		const hasEpisode = await podcast.hasEpisodeById(matchingEpisode._id);
		assert.isTrue(hasEpisode);
	});

	it('does not have episode by guid', async () => {
		const hasEpisode = await podcast.hasEpisodeById(nonMatchingEpisode._id);
		assert.isFalse(hasEpisode);
	});
});
