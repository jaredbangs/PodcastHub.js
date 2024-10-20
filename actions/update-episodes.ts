import { Podcast } from "../models/podcast";
import { Logger } from "../logger";
import { FetchRss } from "./fetchRss";
import { FetchRssLive } from "./fetchRssLive";
import { ParseFeedDataToPodcastModel } from "../parsing/parseFeedDataToPodcastModel";
import { Episode } from "../models/episode";
import { PodcastRepository } from "../repositories/podcastRepository";

const logger = Logger.logger;

export class UpdateEpisodes {
  
  private readonly fetchRss: FetchRss = new FetchRssLive();
  
  private readonly parser = new ParseFeedDataToPodcastModel();
  
  private readonly repository = new PodcastRepository();
  
  public async update(podcast: Podcast, fetcher?: () => Promise<any>): Promise<Podcast> {

    if (fetcher === undefined) {
      fetcher = async () => {
        return await this.fetchRss.fetch(podcast.RssUrl);
      }
    }
 
    logger.info("Podcast: " + podcast.title + " LastChecked: " + podcast.LastChecked);
    logger.info("\tFetching " + podcast.RssUrl);

    try {

      const data = await fetcher();
      
      logger.info("\tParsing " + podcast.RssUrl);
      
      try {
        
        const temporaryModel = await this.parser.parse(data);

        if (temporaryModel !== undefined) {
          logger.info("\tUpdating " + podcast.RssUrl);
          return await this.updateExistingModel(podcast, temporaryModel);

        } else {
          const err = new Error("No parsed podcast model");
          logger.error(err);
          throw err;
        }

      } catch(err) {
        if (err !== undefined && err != null){
          logger.error(err);
        }
        throw err;
      }
   
    } catch(err) {
      if (err !== undefined && err != null){
        logger.error(err);
      }
      throw err;
    }
      
   
}

private async updateExistingModel(existingModel: Podcast, temporaryModel: Podcast): Promise<Podcast> {

    existingModel.LastChecked = new Date();
    existingModel.LastUpdated = temporaryModel.LastUpdated;
    existingModel.ParsedFeedCache = temporaryModel.ParsedFeedCache;

    const episodes = await temporaryModel.getEpisodes();
    
    return await this.udpateExistingModelWithCurrentEpisodes(existingModel, episodes);
}

private async udpateExistingModelWithCurrentEpisodes(existingModel: Podcast, currentEpisodes: Episode[]) {

    for (const temporaryEpisode of currentEpisodes) {

      const hasEpisode = await existingModel.hasEpisode(temporaryEpisode);
      
      if (!hasEpisode) {
        await existingModel.episodes.push(temporaryEpisode);
        logger.info("Added episode: " + temporaryEpisode.title + " " + temporaryEpisode.enclosureUrl);
      } else {
        logger.info("Already had episode: " + temporaryEpisode.title + " " + temporaryEpisode.enclosureUrl);
      }
    }

    await this.repository.save(existingModel);

    return existingModel;
  }

}