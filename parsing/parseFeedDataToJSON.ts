
export class ParseFeedDataToJSON {
  public async parse(data: any): Promise<any> {
    throw new Error("Not Implemented" + data);
  }
}

/*
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
*/