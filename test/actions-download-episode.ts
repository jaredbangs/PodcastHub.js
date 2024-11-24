import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { DownloadEpisode } from '../actions/download-episode';

const downloadEpisode = new DownloadEpisode();

describe('actions-download-episodes', () => {

	let assert: Chai.AssertStatic;
	let result: string;

  const altDownloadFunction = () => {
    return new Promise((resolve) => {
      result = 'ABC';
      resolve(result);
    });
  };

  before(async () => {
		assert = await ChaiWrapper.importAssert();
    result = "";
    await downloadEpisode.download('https://downloadUrlFake', altDownloadFunction);
  });

	it('test that download function was called', () => {
    assert.strictEqual(result, 'ABC');
  });
});
