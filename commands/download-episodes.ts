#!/usr/bin/env node

const id = process.argv[2];

import { Logger } from "../util/logger";
import { EpisodeIterator } from "../actions/episodeIterator";
import { PodcastIterator } from "../actions/podcastIterator";
import { Podcast } from "../models/podcast";

const logger = Logger.logger;

const options: any = {};

options.callback = () => {
  console.log("Downloads completed.");
};

options.podcastOrderClause = [['LastChecked', 'ASC']]; 

if (id !== undefined && id !== null && id !== '') {
  options.podcastWhereClause = { id: id };
}

new PodcastIterator().iterate(async (podcast: Podcast) => {
  
  logger.info("Checking " + podcast._id + "\t" + podcast.title + "\t" + podcast.RssUrl);
 
  new EpisodeIterator().iterate(async (episode: any) => {
    logger.info("Checking " + episode.title + "\t" + episode.published + "\t" + episode.downloadedServerPath);
  }, {});

  /*
  await updateEpisodes(podcast, { }, function (err, updatedPodcastModel) {
    if (err) {
      logger.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
      logger.error(err);
    } else {
      logger.info("Updated " + updatedPodcastModel.id + "\t" + updatedPodcastModel.title + "\t" + podcast.RssUrl);
    }
  });*/
});
