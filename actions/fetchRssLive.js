var request = require('request');

module.exports = function (rssUrl) {

  return new Promise((resolve, reject) => {
    
    request(rssUrl, function (err, res, data) {
      if (err) {
        console.error('Network error', err);
        reject(err);
      } else {
        resolve(data);
      }
    });

  });
}
