/*
var assert = require('chai').assert;
var chai = require('chai');
chai.use(require('chai-string'));
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

	it('add existing subscription', async function () {
    
    let error, subscription;
   
    try {
      subscription = await addSubscription(user, podcast.id); 
    } catch (err) {
      error = err;
    }
    
    assert.isUndefined(subscription);
    assert.isNotNull(error);
    assert.startsWith(error.toString(), "Error: Already subscribed");
	});

});
