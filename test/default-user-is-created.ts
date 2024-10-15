import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import { UserRepository } from '../repositories/userRepository';

describe('default-user-is-created', function () {
	
	let assert: Chai.AssertStatic;

	const userRepository = new UserRepository();

	before(async () => {
		assert = await ChaiWrapper.importAssert();
  	});
	
  	it('current user name', async function () {
    	const currentUser = await userRepository.loadCurrentUser();
    	assert.strictEqual(currentUser.name, 'Jared');
	});
})
