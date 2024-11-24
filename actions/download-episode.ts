'use strict';

// import path from 'path';
import dotenv from 'dotenv'; 
dotenv.config();

import Downloader from 'nodejs-file-downloader';

export class DownloadEpisode {

  public async download(episodeUrl: string, downloader?: () => Promise<any>): Promise<string> {
    
    if (downloader === undefined) {
      downloader = async () => {
        return await this.downloadFile(episodeUrl);
      }
    }

    return await downloader();
  }

  public async downloadFile(url: string): Promise<string | null> {

    const downloadDirectory: string = process.env.DOWNLOADS_DIR + '/';

    if (downloadDirectory !== undefined) {
    
      const downloader = new Downloader({
        url,
        directory: downloadDirectory, //Sub directories will also be automatically created if they do not exist.
        onBeforeSave: (deducedName: string) => {
          console.log(`The file name is: ${deducedName}`);
          //If you return a string here, it will be used as the name(that includes the extension!).
          
          const adjustedName = deducedName;

          return adjustedName;
        },
        /*
        onProgress: (percentage: string, chunk: object, remainingSize: number) => {
          //Gets called with each chunk.
          console.log("% ", percentage);
          console.log("Current chunk of data: ", chunk);
          console.log("Remaining bytes: ", remainingSize);
        },
        */
      });
    
      try {
        const report = await downloader.download();

        return report.filePath;

      } catch (error) {
        console.log(error);
        throw(error);
      }
    } else {
      throw new Error("No download directory has been set.");
    }
  }

}