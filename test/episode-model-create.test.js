var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('models/episode', function () {

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Episode.destroy({ truncate: true }),
		]);
  });

	describe('create', function () {
		it('creates a episode', function () {
			return models.Episode.create({ title: 'Episode 1' }).bind(this).then(function (episode) {
				assert.strictEqual(episode.title, 'Episode 1');
				assert.strictEqual(episode.createdAt.getHours(), new Date().getHours());
				assert.strictEqual(episode.updatedAt.getHours(), new Date().getHours());
			});
		});
	});

});
