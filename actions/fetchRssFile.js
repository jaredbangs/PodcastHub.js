var fs = require('fs');
var path = require('path');

module.exports = function (testDataFileName) {

  return new Promise((resolve, reject) => {
	
    fs.readFile(path.resolve(__dirname, '../test/' + testDataFileName), 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });

  });
}
