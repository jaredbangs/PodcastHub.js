import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { AddSubscription } from '../actions/add-subscription';
import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';
import { PodcastRepository } from '../repositories/podcastRepository';
import { UserRepository } from '../repositories/userRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';

const addSubscription = new AddSubscription();

describe('actions-add-subscription', () => {

	let assert: Chai.AssertStatic;
	
	const podcastRepository = new PodcastRepository();
	const userRepository = new UserRepository();
	const subscriptionRepository = new SubscriptionRepository();
	
	let podcast: Podcast;
	let podcastId: string;
	let user: User;

	beforeEach(async () => {
		assert = await ChaiWrapper.importAssert();

		await subscriptionRepository.deleteAll();
		await podcastRepository.deleteAll();
		await userRepository.deleteAll();
		
		user = new User();
		user.name = 'Jared';
		await userRepository.save(user);

		podcast = await Podcast.create('Subscription Test');
		podcastId = podcast._id;
		await podcastRepository.save(podcast);

		await addSubscription.add(user, podcast); 
  	});

	it('count', async () => {
		
		const subscriptions: Subscription[] = await subscriptionRepository.loadAll();

		console.log(subscriptions);
		
		assert.strictEqual(subscriptions.length, 1);
	});

	it('user subscription count', async () => {

		const subscriptions: Subscription[] = await subscriptionRepository.getSubscriptionsForUser(user);
		
		assert.strictEqual(subscriptions.length, 1);
	});

	it('podcast subscription count', async () => {

		const podcast: Podcast = await podcastRepository.load(podcastId);
		const subscriptions: Subscription[] = await subscriptionRepository.getSubscriptionsForPodcast(podcast);
		assert.strictEqual(subscriptions.length, 1);
	});

});
