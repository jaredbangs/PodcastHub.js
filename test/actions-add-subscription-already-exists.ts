import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { AddSubscription } from '../actions/add-subscription';
import { Podcast } from '../models/podcast';
import { User } from '../models/user';
import { PodcastRepository } from '../repositories/podcastRepository';
import { UserRepository } from '../repositories/userRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';
const addSubscription = new AddSubscription();

describe('actions-add-subscription-already-exists', () => {

  let assert: Chai.AssertStatic;
  
	const podcastRepository = new PodcastRepository();
	const userRepository = new UserRepository();
	const subscriptionRepository = new SubscriptionRepository();
 
  let podcast: Podcast;
  let subscriptionId: string;
  let user: User;

	before(async () => {
    assert = await ChaiWrapper.importAssert();

    await subscriptionRepository.deleteAll();
    await podcastRepository.deleteAll();
    await userRepository.deleteAll();
    
    user = new User();
    user.name = 'Jared';
		await userRepository.save(user);

    podcast = await Podcast.create('Subscription Test');
		await podcastRepository.save(podcast);

    const sub = await addSubscription.add(user, podcast);
    subscriptionId = sub._id;

  });

	it('add existing subscription', async () => {
    
    const subscription = await addSubscription.add(user, podcast); 
    
    assert.isDefined(subscription);
    assert.strictEqual(subscription._id, subscriptionId);
	});

});
