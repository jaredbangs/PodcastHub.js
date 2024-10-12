let assert: Chai.AssertStatic;

import('chai').then((c) => {
  assert = c.assert;
});

import { FetchRssFile } from '../actions/fetchRssFile';

const fetchRss = () => {
	return new FetchRssFile().fetch('data-pla.xml');
}

describe('actions-fetchRssFile', function() {
	
	this.timeout(30000);

  let data: any;

  before(async () => {
    data = await fetchRss();
    return;
  });

	it('fetched data', () => {
    assert.strictEqual(data.length, 29674);
  });
})
