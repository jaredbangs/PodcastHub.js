let assert: Chai.AssertStatic;

import('chai').then((c) => {
  
  import('chai-string').then((cs) => {
    c.use(cs.default);
    assert = c.assert;
  });
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

    await addSubscription.add(user, podcast.id); 
  });

	it('add existing subscription', async () => {
    
    let error, subscription;
   
    try {
      subscription = await addSubscription.add(user, podcast.id); 
    } catch (err) {
      error = err;
    }
    
    assert.isUndefined(subscription);
    assert.isNotNull(error);
    assert.startsWith((error as any).toString(), "Error: Already subscribed");
	});

});
