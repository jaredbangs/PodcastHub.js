let assert: Chai.AssertStatic;

import('chai').then((c) => {
	assert = c.assert;
});

import { AddSubscription } from '../actions/add-subscription';
import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';

const addSubscription = new AddSubscription();

describe('actions-add-subscription', () => {

	let podcast: Podcast;
	let user: User;

	before(() => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
  	});

  	beforeEach(async () => {

		await Subscription.destroyAll();
		await Podcast.destroyAll();
		await User.destroyAll();
		
		user = await User.create('Jared');
		podcast = await Podcast.create('Subscription Test');

		await addSubscription.add(user, podcast._id); 

  	});

	it('count', async () => {
		
		const subscriptions: Subscription[] = await Subscription.findAll();
		
		assert.strictEqual(subscriptions.length, 1);
	});

	it('user subscription count', async () => {

		const user: User = await User.findOne({ where: { name: 'Jared' }});
		
		const subscriptions: Subscription[] = await user.getSubscriptions();
		
		assert.strictEqual(subscriptions.length, 1);
	});

	it('podcast subscription count', async () => {

		const podcast: Podcast = await Podcast.findOne({ where: { title: 'Subscription Test' }});
		const subscriptions: Subscription[] = await podcast.getSubscriptions();
		assert.strictEqual(subscriptions.length, 1);
	});

});
