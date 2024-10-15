'use strict';

import { SavableItem } from "../repositories/savableItem";
import { UUID } from "../uuid";

// var downloadEpisode = require('../actions/download-episode');

export class Episode implements SavableItem {

  public _id: string = "";
  public createdAt: Date = new Date();
  public description: string = "";
  public downloadedServerPath: string = "";
  public duration: number = 0;
  public enclosureType: string = "";
  public enclosureUrl: string = "";
  public fileSize: number = 0;
  public guid: string = "";
  public imageUrl: string = "";
  public published: Date = new Date();
  public shouldDownload: boolean = false;
  public title: string = "";
  public updatedAt: Date = new Date();
	
  constructor(id: string = UUID.random()){
    this._id = id;
  }

  public async download(): Promise<void> {
    throw new Error("Not Implemented");
  }

}

/*

module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
    guid: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    published: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    imageUrl: DataTypes.STRING,
    enclosureUrl: DataTypes.STRING,
    enclosureType: DataTypes.STRING,
    shouldDownload: DataTypes.BOOLEAN,
    downloadedServerPath: DataTypes.STRING
  }, {});
  Episode.associate = function(models) {
    // associations can be defined here
		Episode.belongsTo(models.Podcast, { onDelete: 'cascade' });
  };
	
  Episode.prototype.download = function () {  
   
    var self = this;

    return new Promise(async (resolve, reject) => {
  
      if (self.downloadedServerPath !== undefined && self.downloadedServerPath !== null && self.downloadedServerPath !== '') {
      
        try {

          self.downloadedServerPath = await downloadEpisode(self);

          resolve(self.downloadedServerPath);

        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error('Episode has already been downloaded to ' + self.downloadedServerPath));
      }

    });
	};

  return Episode;
};
*/