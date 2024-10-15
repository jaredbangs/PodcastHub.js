import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';
import { PodcastRepository } from '../repositories/podcastRepository';
import { UserRepository } from '../repositories/userRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';

describe('repositories-subscription', function () {

	let assert: Chai.AssertStatic;
  let podcast: Podcast;
  let subscriptionReloaded: Subscription;
  let user: User;
  const subscriptionRepository = new SubscriptionRepository();

	before(async () => {
    assert = await ChaiWrapper.importAssert();
  });

	beforeEach(async () => {
		await subscriptionRepository.deleteAll();

		const podcastRepository = new PodcastRepository();
    podcastRepository.deleteAll();
		
    const userRepository = new UserRepository();
    userRepository.deleteAll();
    
    user = new User();
    user.name = 'Jared';
    await userRepository.save(user);

    podcast = new Podcast();
    podcast.title = "Subscription Test";
    await podcastRepository.save(podcast);

    const subscription = new Subscription(user, podcast);

    try {
      await subscriptionRepository.save(subscription);
    } catch(err){
      console.error(err);
    }

    subscriptionReloaded = await subscriptionRepository.load(subscription._id);
  });

	it('count', async () => {
		const subscriptions: Subscription[] = await subscriptionRepository.loadAll();
    assert.strictEqual(subscriptions.length, 1);
	});

	it('has expected id', async () => {
		const subscriptions: Subscription[] = await subscriptionRepository.loadAll();
    const sub = subscriptions[0];
    assert.strictEqual(sub?._id, subscriptionReloaded._id);
	});

	it('user subscription count', async () => {
    const subscriptions = await subscriptionRepository.getSubscriptionsForUser(user);
    assert.strictEqual(subscriptions.length, 1);
    const sub = subscriptions[0];
    assert.strictEqual(sub?._id, subscriptionReloaded._id);
	});

	it('podcast subscription count', async () => {
    const subscriptions = await subscriptionRepository.getSubscriptionsForPodcast(podcast);
    assert.strictEqual(subscriptions.length, 1);
    const sub = subscriptions[0];
    assert.strictEqual(sub?._id, subscriptionReloaded._id);
	});

	it('child podcast object was saved', async () => {
		const podcastLoadedFromSub = await subscriptionReloaded.getPodcast();
    assert.strictEqual(podcastLoadedFromSub.title, "Subscription Test");
	});

	it('child user object was saved', async () => {
		const userLoadedFromSub = await subscriptionReloaded.getUser();
    assert.strictEqual(userLoadedFromSub.name, "Jared");
	});

});
