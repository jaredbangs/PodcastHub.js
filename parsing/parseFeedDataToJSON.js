var parsePodcast = require('node-podcast-parser');

module.exports = function (data) {
  
  return new Promise((resolve, reject) => {
	
    parsePodcast(data, function (err, parsedData) {
      if (err) {
        reject(err);
      } else {
        resolve(parsedData);
      }
    });
  });
}
