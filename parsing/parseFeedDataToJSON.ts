import parse from 'node-podcast-parser';

export class ParseFeedDataToJSON {

  public async parse(data: any): Promise<any> {

    return new Promise<any>((resolve, reject) => {
    
      parse(data, (err: any, parsedData: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsedData);
        }
      });
    });

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