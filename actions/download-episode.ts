'use strict';

import dotenv from 'dotenv'; 
dotenv.config();

export class DownloadEpisode {

  public async download(episodeUrl: string, downloader?: () => Promise<any>): Promise<string> {
    
    if (downloader === undefined) {
      downloader = async () => {
        
        const downloadDirectory: string = process.env.DOWNLOADS_DIR + '/';
        
        // await this.fetchRss.fetch(rssUrl);
        
        return downloadDirectory; 
      }
    }

    const downloadedServerPath = await downloader();

    return downloadedServerPath;
  }

}