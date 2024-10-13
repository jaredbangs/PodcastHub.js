import { Podcast } from '../models/podcast';
import { ParseFeedDataToJSON } from "../parsing/parseFeedDataToJSON";

export class ParseFeedDataToPodcastModel {

  public async parse(data: any): Promise<Podcast> {
    
    const parser = new ParseFeedDataToJSON();

    const parsedData = await parser.parse(data);
      
    const podcast = new Podcast();
    podcast.author = parsedData.author;
    podcast.image = parsedData.image;
    podcast.language = parsedData.language;
    podcast.link = parsedData.link;
    podcast.title = parsedData.title;
    podcast.LastUpdated = parsedData.updated;
    podcast.ParsedFeedCache = parsedData;
      
    if (parsedData.description !== undefined) {
      podcast.descriptionLong = parsedData.description.long;
      podcast.descriptionShort = parsedData.description.short;
    }
   
    /*
    podcast.episodes = [];

    if (parsedData.episodes !== undefined) {

      parsedData.episodes.forEach(function (parsedEpisode) {
        addParsedEpisodeToPodcast(podcast, parsedEpisode);
      });
    }

    podcast.getEpisodes = function () {
      return new Promise(async (resolve) => {
        resolve(podcast.episodes);
      });
    };
    */

    return podcast;
  }

}

/*
var models = require('../models');
var parseToJSON = require('./parseFeedDataToJSON');

var addParsedEnclosureToEpisode = function (episode, parsedEnclosure) {

	if (parsedEnclosure !== undefined) {
		episode.enclosureType = parsedEnclosure.type;
		episode.enclosureUrl = parsedEnclosure.url;
		if (!isNaN(parsedEnclosure.filesize)) {
      episode.fileSize = parsedEnclosure.filesize;
    }
	}
}

var addParsedEpisodeToPodcast = function (podcast, parsedEpisode) {

	var episode = new models.Episode({ 
		description: parsedEpisode.description, 
		duration: parsedEpisode.duration, 
		guid: parsedEpisode.guid, 
		image: parsedEpisode.image, 
		published: parsedEpisode.published, 
		title: parsedEpisode.title 
		});
  
  addParsedEnclosureToEpisode(episode, parsedEpisode.enclosure);
  
  podcast.episodes.push(episode);

  return episode;
}

module.exports = function (data) {
	
  return new Promise(async (resolve, reject) => {
    models.sequelize.sync();

    try {

      var parsedData = await parseToJSON(data);
      
      var podcast = new models.Podcast({ 
        author: parsedData.author, 
        image: parsedData.image, 
        language: parsedData.language, 
        link: parsedData.link, 
        title: parsedData.title, 
        LastUpdated: parsedData.updated,
        ParsedFeedCache: parsedData,
      });

      podcast.episodes = [];
      
      if (parsedData.description !== undefined) {
        podcast.descriptionLong = parsedData.description.long;
        podcast.descriptionShort = parsedData.description.short;
      }

      if (parsedData.episodes !== undefined) {

        parsedData.episodes.forEach(function (parsedEpisode) {
          addParsedEpisodeToPodcast(podcast, parsedEpisode);
        });
      }

      podcast.getEpisodes = function () {
        return new Promise(async (resolve) => {
          resolve(podcast.episodes);
        });
      };

      resolve(podcast);

    } catch(err) {
      reject(err);
    }

  });
}
*/