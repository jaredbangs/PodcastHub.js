'use strict';

require('dotenv').config();
var download = require('download');

module.exports = function (episode, options) {

    if (options.alternateDownloadFunction !== undefined) {
      download = options.alternateDownloadFunction;
    }

    return new Promise(async (resolve, reject) => {

      try {
        download(episode.enclosureUrl, process.env.DOWNLOADS_DIR + '/').then((data) => {
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
      
    });
}
