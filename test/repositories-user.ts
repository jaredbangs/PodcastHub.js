import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

describe('repositories-user', function () {
	
	let assert: Chai.AssertStatic;
	const repository = new UserRepository();
	
	let user: User;
	let userId: string;

	before(async () => {
		
		assert = await ChaiWrapper.importAssert();
		
		await repository.deleteAll();

		const u = new User();
		u.name = "Jared";
		u.email = "jaredbangs@gmail.com";
		userId = u._id;
		repository.save(u);

		user = await repository.load(userId);
	});

	it('count', async () => {
		const users: User[] = await repository.loadAll();
		assert.strictEqual(users.length, 1);
	});

	it('first entry name', async () => {
		assert.strictEqual(user.name, 'Jared');
	});

	it('first entry email', async () => {
		assert.strictEqual(user.email, 'jaredbangs@gmail.com');
	});
	
	/*
  	it('current user name', async () => {
    	const currentUser = await User.loadCurrentUser();
    	assert.strictEqual(currentUser.name, 'Jared');
	});
	*/
})
