/*
var assert = require('chai').assert;

var fetchRssFile = require('../actions/fetchRssFile');

var fetchRss = function () {
	return fetchRssFile('data-pla.xml');
}
*/

describe('actions-fetchRssFile', function () {
	
	this.timeout(30000);

  let data;

  before(async function () {
    data = await fetchRss();
    return;
  });

	it('fetched data', function () {
    assert.strictEqual(data.length, 29674);
  });
})
