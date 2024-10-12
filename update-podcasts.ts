#!/usr/bin/env node

const id = process.argv[2];

import { Logger } from './logger';
import { PodcastIterator } from './actions/podcastIterator';
import { UpdateEpisodes } from './actions/update-episodes';

// var models = require('./models');

const logger = Logger.logger;

// models.sequelize.sync();

const options: any = {};

options.callback = function () {
  console.log("Update completed.");
};

options.podcastOrderClause = [['LastChecked', 'ASC']]; 

if (id !== undefined && id !== null && id !== '') {
  options.podcastWhereClause = { id: id };
}

new PodcastIterator().iterate(async (podcast: any) => {
  await new UpdateEpisodes().update(podcast, { }, (err: any, updatedPodcastModel: any) => {
    if (err) {
      logger.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
      logger.error(err);
    } else {
      logger.info("Updated " + updatedPodcastModel.id + "\t" + updatedPodcastModel.title + "\t" + podcast.RssUrl);
    }
  });
}, options);
