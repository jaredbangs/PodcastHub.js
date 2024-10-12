/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

var addSubscription = require('../actions/add-subscription');
*/

describe('actions-add-subscription', function () {

  let podcast, user;

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(async function () {

    await models.Subscription.destroy({ truncate: true });
    await models.Podcast.destroy({ truncate: true });
    await models.User.destroy({ truncate: true });
    
    user = await models.User.create({ name: 'Jared' });
    podcast = await models.Podcast.create({ title: 'Subscription Test' });

    await addSubscription(user, podcast.id); 

    return;
  });

	it('count', function () {
		return models.Subscription.findAll().then(function (subscriptions) {
			assert.strictEqual(subscriptions.length, 1);
		});
	});

	it('user subscription count', function () {
		return models.User.findOne({ where: { name: 'Jared' }}).then(async function (user) {
      const subscriptions = await user.getSubscriptions();
      assert.strictEqual(subscriptions.length, 1);
		});
	});

	it('podcast subscription count', function () {
		return models.Podcast.findOne({ where: { title: 'Subscription Test' }}).then(async function (podcast) {
      const subscriptions = await podcast.getSubscriptions();
      assert.strictEqual(subscriptions.length, 1);
		});
	});

});
