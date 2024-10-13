import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { AddSubscription } from '../actions/add-subscription';
import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';
const addSubscription = new AddSubscription();

describe('actions-add-subscription', () => {

  let assert: Chai.AssertStatic;
  
  let podcast: Podcast;
  let user: User;

	before(async () => {
    assert = await ChaiWrapper.importAssert();
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
