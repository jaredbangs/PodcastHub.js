'use strict';

import { SavableItem, SavableItemBase } from "../repositories/savableItem";
import { UUID } from "../uuid";
import { Episode } from "./episode";

export class Podcast extends SavableItemBase {
  
  public author: string = "";
  public copyright: any;
  public descriptionLong: string = "";
  public descriptionShort: string = "";
  public episodes: Episode[] = [];
  public image: string = "";
  public language: string = "";
  public lastChecked_ISOString: string = "";
  public lastUpdated_ISOString: string = "";
  public link: string = "";
  public ParsedFeedCache: any;
  public RssUrl: string = "";
  public title: string = "";
  
  constructor(id: string = UUID.random()){
    super(id);
  }

  public get LastChecked(): Date {
    return new Date(this.lastChecked_ISOString);
  }
  public set LastChecked(val: Date) {
    this.lastChecked_ISOString = val.toISOString();
  }

  public get LastUpdated(): Date {
    return new Date(this.lastUpdated_ISOString);
  }
  public set LastUpdated(val: Date) {
    this.lastUpdated_ISOString = val.toISOString();
  }

  public static async create(title: string, rssUrl?: string): Promise<Podcast> {
    
    const podcast = new Podcast();
    podcast.title = title;
    
    if (rssUrl != undefined) {
      podcast.RssUrl = rssUrl;
    }

    return podcast;
  }

  public async getEpisodeById(id: string): Promise<Episode> {
  
    const episode = await this.getEpisodeOrUndefinedById(id);

    if (episode !== undefined) {
      return episode;
    } else {
      throw new Error("Not Found");
    }
  }
	
  public async getEpisodes(): Promise<Episode[]> {
    // TODO: load on demand based on search parameters rather than returning all
    return this.episodes;
	}
  
  public async hasEpisode(episode: Episode): Promise<boolean> { 
    // TODO: try multiple ways of matching, not just id
    return this.getEpisodeFromArrayById(this.episodes, episode._id) !== undefined;
  }
  
  public async hasEpisodeById(id: string) {
    return await this.getEpisodeOrUndefinedById(id) !== undefined;
  }

  private getEpisodeFromArrayById(episodes: Episode[], id: string): Episode | undefined {

    const arrayEntry = episodes.find((e) => e._id === id);

    if (arrayEntry === undefined){
      return undefined;
    } else if (arrayEntry instanceof Episode) {
      return arrayEntry;
    } else if ((arrayEntry as SavableItem)._id === id) {
        const e = new Episode(id);
        Object.assign(e, arrayEntry);
        return e;
    } else {
      return undefined;
    }

  }

  private async getEpisodeOrUndefinedById(id: string): Promise<Episode | undefined> {
  
    const episodes = await this.getEpisodes();
  
    return this.getEpisodeFromArrayById(episodes, id);
  }
}