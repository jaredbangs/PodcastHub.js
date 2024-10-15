import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { Episode } from '../models/episode';
import { PodcastRepository } from '../repositories/podcastRepository';
import { Podcast } from '../models/podcast';

describe('orm-model-episode', function () {
	
	let assert: Chai.AssertStatic;

	let episode: Episode;

	before(async () => {
		
		assert = await ChaiWrapper.importAssert();

		const podcastRepository = new PodcastRepository(); // TODO: replace with episode repository eventually

		await podcastRepository.deleteAll();

		const e = new Episode();
		e.description= 'abcd';
		e.enclosureType = 'audio/mpeg';
		e.enclosureUrl = 'http://www.phonelosers.org/i.mp3';
		e.fileSize = 9876;
		e.imageUrl = 'http://www.phonelosers.org/i.jpg';
		e.published = new Date("2018-10-16 15:03:22");
		e.title = 'Episode 1';
		
		const pod = new Podcast();
		pod.episodes.push(e);

		podcastRepository.save(pod);

		const reloaded = await podcastRepository.load(pod._id);

		episode = await reloaded.getEpisodeById(e._id);
		
	});

	it('createdAt', async () => {
		assert.strictEqual(episode.createdAt.getHours(), new Date().getHours());
	});

	it('description', async () => {
		assert.strictEqual(episode.description, 'abcd');
	});

	it('enclosureType', async () => {
		assert.strictEqual(episode.enclosureType, 'audio/mpeg');
	});

	it('enclosureUrl', async () => {
		assert.strictEqual(episode.enclosureUrl, 'http://www.phonelosers.org/i.mp3');
	});

	it('fileSize', async () => {
		assert.strictEqual(episode.fileSize, 9876);
	});

	it('imageUrl', async () => {
		assert.strictEqual(episode.imageUrl, 'http://www.phonelosers.org/i.jpg');
	});
	
	it('published', async () => {
		assert.equalDate(episode.published, new Date("2018-10-16 15:03:22"));
	});
	
	it('title', async () => {
		assert.strictEqual(episode.title, 'Episode 1');
	});

	it('updatedAt', async () => {
		assert.strictEqual(episode.updatedAt.getHours(), new Date().getHours());
	});

});
