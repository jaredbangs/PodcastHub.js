import { FetchRss } from "./fetchRss";

export class FetchRssLive implements FetchRss {
  public async fetch(rssUrl: string): Promise<any> {
    throw new Error("Not Implemented" + rssUrl);
  }
}

/*
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
*/