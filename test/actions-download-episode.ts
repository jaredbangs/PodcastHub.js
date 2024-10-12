/*
var assert = require('chai').assert;

var downloadEpisode = require('../actions/download-episode');
*/

describe('actions-download-episodes', function () {

	let result;

  const altDownloadFunction = function () {
    return new Promise((resolve) => {
      resolve('ABC');
    });
  };

  before(async () => {
    result = await downloadEpisode('https://downloadUrlFake', { alternateDownloadFunction: altDownloadFunction });
  });

	it('test that download function was called', function () {
    assert.strictEqual(result, 'ABC');
  });
});
