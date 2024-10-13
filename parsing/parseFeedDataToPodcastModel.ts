import { Episode } from '../models/episode';
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

    if (parsedData.episodes !== undefined) {
      parsedData.episodes.forEach((parsedEpisode: any) => {
        this.addParsedEpisodeToPodcast(podcast, parsedEpisode);
      });
    }

    return podcast;
  }
  
  private addParsedEnclosureToEpisode(episode: Episode, enclosure: any) {
    
    if (enclosure !== undefined) {
      episode.enclosureType = enclosure.type;
      episode.enclosureUrl = enclosure.url;
      if (!isNaN(enclosure.filesize)) {
        episode.fileSize = enclosure.filesize;
      }
    }
  }

  private addParsedEpisodeToPodcast(podcast: Podcast, parsedEpisode: any) {
	
    const episode = new Episode();
    episode.description = parsedEpisode.description;
    episode.duration = parsedEpisode.duration;
    episode.guid = parsedEpisode.guid;
    episode.imageUrl = parsedEpisode.image;
    episode.published = parsedEpisode.published;
    episode.title = parsedEpisode.title; 
  
    this.addParsedEnclosureToEpisode(episode, parsedEpisode.enclosure);
  
    podcast.episodes.push(episode);
  }
}
