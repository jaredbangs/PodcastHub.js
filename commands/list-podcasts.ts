#!/usr/bin/env node

import { PodcastIterator } from '../actions/podcastIterator';
import { Logger } from '../util/logger';
import { Podcast } from '../models/podcast';

const logger = Logger.logger;

new PodcastIterator().iterate(async (podcast: Podcast) => {
  
  const episodes = await podcast.getEpisodes();

  logger.info(podcast.title + " - " + podcast.RssUrl + " - " + 
    episodes.length + " episodes. Checked: " + podcast.LastChecked + "; Updated: " + podcast.LastUpdated);
  
});
