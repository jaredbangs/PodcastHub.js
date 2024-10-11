var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));

var models = require('../models');

describe('default-user-is-created', function () {

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.User.destroy({ truncate: true }),
		]);
  });
	
  it('current user name', async function () {
    var currentUser = await models.User.loadCurrentUser();
    assert.strictEqual(currentUser.name, 'Jared');
	});
})
