import { User } from '../models/user';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
  
  import('chai-datetime').then((cdt) => {
    
    c.use(cdt.default);
    assert = c.assert;
  });
});

describe('default-user-is-created', function () {

	before(async () => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
  	});

  	beforeEach(async () => {
		/*
		return Bluebird.all([
			models.User.destroy({ truncate: true }),
		]);
		*/
  	});
	
  	it('current user name', async function () {
    	const currentUser = await User.loadCurrentUser();
    	assert.strictEqual(currentUser.name, 'Jared');
	});
})
