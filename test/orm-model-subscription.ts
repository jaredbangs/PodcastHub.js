import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

describe('orm-model-subscription', function () {

  let podcast: Podcast;
  let subscription: Subscription;
  let user: User;

	before(async () => {
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

    subscription = await Subscription.create();
    await subscription.setUser(user);
    await subscription.setPodcast(podcast);
    await subscription.save();

    return;
  });

	it('count', async () => {
		const subscriptions: Subscription[] = await Subscription.findAll();
    assert.strictEqual(subscriptions.length, 1);
	});

	it('user subscription count', async () => {
		const user = await User.findOne({ where: { name: 'Jared' }});
    const subscriptions = await user.getSubscriptions();
    assert.strictEqual(subscriptions.length, 1);
	});

	it('podcast subscription count', async () => {
		const podcast = await Podcast.findOne({ where: { title: 'Subscription Test' }});
    const subscriptions = await podcast.getSubscriptions();
    assert.strictEqual(subscriptions.length, 1);
	});

});
