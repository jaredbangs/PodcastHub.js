/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');
*/
describe('orm-model-episode', function () {

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Episode.destroy({ truncate: true }),
			models.Episode.create({ 
				description: 'abcd',
				enclosureType: 'audio/mpeg',
				enclosureUrl: 'http://www.phonelosers.org/i.mp3',
				fileSize: 9876,
				guid: '12321242',
				imageUrl: 'http://www.phonelosers.org/i.jpg',
				published: new Date("2018-10-16 15:03:22"),
				title: 'Episode 1' 
			})
		]);
  });

	it('createdAt', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.createdAt.getHours(), new Date().getHours());
		});
	});

	it('description', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.description, 'abcd');
		});
	});

	it('enclosureType', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.enclosureType, 'audio/mpeg');
		});
	});

	it('enclosureUrl', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.enclosureUrl, 'http://www.phonelosers.org/i.mp3');
		});
	});

	it('fileSize', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.fileSize, 9876);
		});
	});

	it('guid', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.guid, '12321242');
		});
	});

	it('imageUrl', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.imageUrl, 'http://www.phonelosers.org/i.jpg');
		});
	});
	
	it('published', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.equalDate(episode.published, new Date("2018-10-16 15:03:22"));
		});
	});
	
	it('title', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.title, 'Episode 1');
		});
	});

	it('updatedAt', function () {
		return models.Episode.findOne({ where: { title: 'Episode 1' }}).then(function (episode) {
			assert.strictEqual(episode.updatedAt.getHours(), new Date().getHours());
		});
	});

});
