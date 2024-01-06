var assert = require('chai').assert;

var downloadEpisode = require('../actions/download-episode');

describe('actions-download-episodes', function () {

	var altDownloadFunction, result;

  altDownloadFunction = function () {
    return new Promise((resolve) => {
      resolve('ABC');
    });
  };

  before(function () {
    return new Promise(async (resolve) => {
      result = await downloadEpisode('https://downloadUrlFake', { alternateDownloadFunction: altDownloadFunction });
      resolve(result);
    });
  });

	it('test that download function was called', function () {
    assert.strictEqual(result, 'ABC');
  });
});
