import { Episode } from '../models/episode';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
	assert = c.assert;
});

describe('orm-model-episode', function () {

	before(async () => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
	});

	beforeEach(async () => {
		await Episode.destroyAll();
		const episode = await Episode.create('12321242');
		episode.description= 'abcd';
		episode.enclosureType = 'audio/mpeg';
		episode.enclosureUrl = 'http://www.phonelosers.org/i.mp3';
		episode.fileSize = 9876;
		episode.imageUrl = 'http://www.phonelosers.org/i.jpg';
		episode.published = new Date("2018-10-16 15:03:22");
		episode.title = 'Episode 1'; 
	});

	it('createdAt', async () => {
		const episode: Episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.createdAt.getHours(), new Date().getHours());
	});

	it('description', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.description, 'abcd');
	});

	it('enclosureType', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.enclosureType, 'audio/mpeg');
	});

	it('enclosureUrl', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.enclosureUrl, 'http://www.phonelosers.org/i.mp3');
	});

	it('fileSize', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.fileSize, 9876);
	});

	it('guid', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.guid, '12321242');
	});

	it('imageUrl', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.imageUrl, 'http://www.phonelosers.org/i.jpg');
	});
	
	it('published', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.equalDate(episode.published, new Date("2018-10-16 15:03:22"));
	});
	
	it('title', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.title, 'Episode 1');
	});

	it('updatedAt', async () => {
		const episode = await Episode.findOne({ where: { title: 'Episode 1' }});
		assert.strictEqual(episode.updatedAt.getHours(), new Date().getHours());
	});

});
