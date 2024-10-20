#!/usr/bin/env node

const id = process.argv[2];

import { Logger } from './logger';
import { PodcastIterator } from './actions/podcastIterator';
import { UpdateEpisodes } from './actions/update-episodes';
import { Podcast } from './models/podcast';

const logger = Logger.logger;

const options: any = {};

options.callback = function () {
  console.log("Update completed.");
};

options.podcastOrderClause = [['LastChecked', 'ASC']]; 

if (id !== undefined && id !== null && id !== '') {
  options.podcastWhereClause = { id: id };
}

new PodcastIterator().iterate(async (podcast: Podcast) => {
  
  const updatedPodcastModel = await new UpdateEpisodes().update(podcast);
  
  logger.info("Updated " + updatedPodcastModel.title + "\t" + podcast.RssUrl);

});
