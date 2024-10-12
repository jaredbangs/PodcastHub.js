#!/usr/bin/env node

import { PodcastIterator } from "./actions/podcastIterator";

const shouldDestroy = (podcast: any) => { 
  return podcast.RssUrl === undefined || podcast.RssUrl === null || podcast.RssUrl === "null"; 
};

const options: any = {};

options.callback = () => {
  console.log("Cleanup completed.");
};

options.preIterationFunction = (podcasts: any) => {
 
  const podcastsToDestroy = [];

  console.log("All podcasts: " + podcasts.length); 

  podcasts.forEach((podcast: any) => {
    if (shouldDestroy(podcast)) {
      podcastsToDestroy.push(podcast);
    }
  });
  
  console.log("Podcasts to destroy: " + podcastsToDestroy.length); 
};

new PodcastIterator().iterate(async (podcast: any) => {

    if (shouldDestroy(podcast)) {
        let message = "Deleting " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl;
        console.log(message);
        message = "Deleted " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl;
        await podcast.destroy();
        console.log(message);
    }
}, options);
