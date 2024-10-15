'use strict';

import { SavableItem } from "../repositories/savableItem";
import { UUID } from "../uuid";
import { Episode } from "./episode";

export class Podcast implements SavableItem {
  
  public _id: string = "";
  // public _rev: string | undefined = undefined;
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
    this._id = id;
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
  
    const episodes = await this.getEpisodes();
  
    const episode = episodes.find((e) => e._id === id);

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
  
  public async hasEpisode(matchingEpisode: Episode): Promise<boolean> { 
    return this.episodes.indexOf(matchingEpisode) !== -1;
  }
  
  public async hasEpisodeById(id: string) {
    return this.getEpisodeById(id) !== undefined;
  }
}