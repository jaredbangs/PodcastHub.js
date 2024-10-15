import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { AddSubscription } from '../actions/add-subscription';
import { Podcast } from '../models/podcast';
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
  let user: User;

	before(async () => {
    assert = await ChaiWrapper.importAssert();

    await subscriptionRepository.deleteAll();
    await podcastRepository.deleteAll();
    await userRepository.deleteAll();
    
    user = new User();
    user.name = 'Jared';

    podcast = await Podcast.create('Subscription Test');

    await addSubscription.add(user, podcast._id); 
  });

	it('add existing subscription', async () => {
    
    let error, subscription;
   
    try {
      subscription = await addSubscription.add(user, podcast._id); 
    } catch (err) {
      error = err;
    }
    
    assert.isUndefined(subscription);
    assert.isNotNull(error);
    assert.strictEqual((error as any).toString().indexOf("Error: Already subscribed"), 0);
	});

});
