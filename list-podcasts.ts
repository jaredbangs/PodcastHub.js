#!/usr/bin/env node

import moment from 'moment';

import { PodcastIterator } from './actions/podcastIterator';

new PodcastIterator().iterate((podcast: any) => {
  podcast.countEpisodes().then((episodeCount: any) => {
    console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodeCount + " episodes. Checked: " + moment(podcast.LastChecked).format("YYYY/MM/DD HH:mm") + "; Updated: " + moment(podcast.LastUpdated).format("YYYY/MM/DD HH:mm"));
  });
});
