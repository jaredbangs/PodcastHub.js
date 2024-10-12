/*
var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));

var models = require('../models');
*/

describe('orm-model-user', function () {

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.User.destroy({ truncate: true }),
			models.User.create({ 
				name: 'Jared', 
				email: 'jaredbangs@gmail.com' 
			})
		]);
  });

	it('count', function () {
		return models.User.findAll().then(function(users) {
			assert.strictEqual(users.length, 1);
		})
	});

	it('first entry name', function () {
		return models.User.findOne({ where: { name: 'Jared' }}).then(function (user) {
			assert.strictEqual(user.name, 'Jared');
		});
	});

	it('first entry email', function () {
		return models.User.findOne({ where: { name: 'Jared' }}).then(function (user) {
			assert.strictEqual(user.email, 'jaredbangs@gmail.com');
		});
	});
	
  	it('current user name', async function () {
    	const currentUser = await models.User.loadCurrentUser();
    	assert.strictEqual(currentUser.name, 'Jared');
	});
})
