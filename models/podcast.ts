'use strict';

import { SavableItem } from "../repositories/savableItem";
import { UUID } from "../uuid";
import { Episode } from "./episode";
import { Subscription } from "./subscription";

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
  public LastChecked: Date = new Date();
  public LastUpdated: Date = new Date();
  public link: string = "";
  public ParsedFeedCache: any;
  public RssUrl: string = "";
  public title: string = "";
	
  constructor(id: string = UUID.random()){
    this._id = id;
  }
	
  public static findAll(): PromiseLike<Podcast[]> {
		throw new Error('Method not implemented.');
	}

  public static async create(title: string, rssUrl?: string): Promise<Podcast> {
    
    const podcast = new Podcast();
    podcast.title = title;
    
    if (rssUrl != undefined) {
      podcast.RssUrl = rssUrl;
    }

    return podcast;
  }

	public async createEpisode(title?: string, id?: string): Promise<Episode> {
		throw new Error('Method not implemented.' + id + title);
	}
  
	public async countEpisodes(): Promise<number> {
		throw new Error('Method not implemented.');
	}

  public static async destroyAll(): Promise<void> {
    // TODO: move these to repository
  }

	public static findOne(arg0: { where: { title: string; }; }): Promise<Podcast> {
		throw new Error('Method not implemented.' + arg0);
	}
  
	public static loadById(id: string): Promise<Podcast> {
		throw new Error('Method not implemented.' + id);
	}

  /*
	public async createEpisodeFromReference(episode: any): Promise<any> {
    throw new Error("Not Implemented" + episode);
  }
  */
	
  public async getEpisodes(): Promise<Episode[]> {

    // TODO: load on demand based on search parameters rather than returning all
    return this.episodes;
	}
	
  public async getSubscriptions(): Promise<Subscription[]> {
		throw new Error('Method not implemented.');
	}
  
  public async hasEpisodeByGuid(guid: any): Promise<boolean> { 
    throw new Error("Not Implemented" + guid);
  }

  public async hasMatchingEpisode(episode: Episode): Promise<boolean> { 
    throw new Error("Not Implemented" + episode);
  }

}

/*
var Bluebird = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    LastChecked: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    LastUpdated: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    ParsedFeedCache: DataTypes.JSON,
    RssUrl: DataTypes.STRING,
    author: DataTypes.STRING,
    descriptionLong: DataTypes.STRING,
    descriptionShort: DataTypes.STRING,
    image: DataTypes.STRING,
    language: DataTypes.STRING,
    link: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});

  Podcast.associate = function(models) {
    // associations can be defined here
		Podcast.hasMany(models.Episode, { onDelete: 'cascade', hooks: true });
		Podcast.hasMany(models.Subscription, { onDelete: 'cascade', hooks: true });
  };

	Podcast.prototype.createEpisodeFromReference = function (episode) {  
    
    return new Promise(async (resolve) => {
   
      var createdEpisode, fileSize;

      fileSize = 0;

      if (!isNaN(episode.fileSize)) {
        fileSize = episode.fileSize;
      }

      createdEpisode = await this.createEpisode({ 
        guid: episode.guid, 
        description: episode.description, 
        duration: episode.duration, 
        image: episode.image, 
        published: episode.published, 
        title: episode.title,
        enclosureType: episode.enclosureType,
        enclosureUrl: episode.enclosureUrl,
        fileSize: fileSize
      });

      resolve(createdEpisode);
    });
	};

	Podcast.prototype.hasEpisodeByGuid = function (guid) {  
	
		return Bluebird.all([
			this.getEpisodes({ where: { guid: guid }}).then(function (matchingEpisodes) {
				return matchingEpisodes.length === 1;
			})
		]);
	};

	Podcast.prototype.hasMatchingEpisode = function (episode) {  
		return Bluebird.all([
			this.getEpisodes({ where: { guid: episode.guid }}).then(function (matchingEpisodes) {
				return matchingEpisodes.length === 1;
			})
		]);
	};

  return Podcast;
};
*/