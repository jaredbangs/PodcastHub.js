let assert: Chai.AssertStatic;

import('chai').then((c) => {
  assert = c.assert;
});


import { DownloadEpisode } from '../actions/download-episode';

const downloadEpisode = new DownloadEpisode();

describe('actions-download-episodes', () => {

	let result: string;

  const altDownloadFunction = () => {
    return new Promise((resolve) => {
      result = 'ABC';
      resolve(result);
    });
  };

  before(async () => {
    result = "";
    await downloadEpisode.download('https://downloadUrlFake', { alternateDownloadFunction: altDownloadFunction });
  });

	it('test that download function was called', () => {
    assert.strictEqual(result, 'ABC');
  });
});
