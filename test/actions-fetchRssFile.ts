import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import path from 'path';

import { FetchRssFile } from '../actions/fetchRssFile';

const fetchRss = async () => {
	return await new FetchRssFile().fetch(path.resolve(__dirname, './data-pla.xml'));
}

describe('actions-fetchRssFile', function() {
	
	let assert: Chai.AssertStatic;
	
  this.timeout(30000);

  let data: any;

  before(async () => {
		assert = await ChaiWrapper.importAssert();
    data = await fetchRss();
    return;
  });

	it('fetched data', () => {
    assert.strictEqual(data.length, 29890); // 29674);
  });
})
