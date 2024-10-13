import { User } from '../models/user';

let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

describe('orm-model-user', function () {

	before(async () => {
		/*
		return Bluebird.all([
			models.sequelize.sync()
		]);
		*/
	});

	beforeEach(async () => {
		await User.destroyAll();
		await User.create('Jared', 'jaredbangs@gmail.com');
	});

	it('count', async () => {
		const users: User[] = await User.findAll();
		assert.strictEqual(users.length, 1);
	});

	it('first entry name', async () => {
		const user = await User.findOne({ where: { name: 'Jared' }});
		assert.strictEqual(user.name, 'Jared');
	});

	it('first entry email', async () => {
		const user = await User.findOne({ where: { name: 'Jared' }});
		assert.strictEqual(user.email, 'jaredbangs@gmail.com');
	});
	
  	it('current user name', async () => {
    	const currentUser = await User.loadCurrentUser();
    	assert.strictEqual(currentUser.name, 'Jared');
	});
})
