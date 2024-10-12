#!/usr/bin/env node

import moment from "moment";
import { EpisodeIterator } from "./actions/episodeIterator";

const id = process.argv[2];

const printEpisodes = (podcast: any, episodes: any) => {

  console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodes.length + " episodes");
  
  episodes.forEach((episode: any) => {
    console.log("\t" + moment(episode.published).format("YYYY/MM/DD HH:mm") + "\t" + episode.title + " " + episode.enclosureType + " " + episode.enclosureUrl);
  });
};

const options: any = {};

options.podcastWhereClause = { id: id };

new EpisodeIterator().iterate(printEpisodes, options);
