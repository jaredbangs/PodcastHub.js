'use strict';

// var downloadEpisode = require('../actions/download-episode');

export class Episode {

  public createdAt: Date = new Date();
  public description: string = "";
  public downloadedServerPath: string = "";
  public enclosureType: string = "";
  public enclosureUrl: string = "";
  public fileSize: number = 0;
  public guid: string = "";
  public imageUrl: string = "";
  public published: Date = new Date();
  public shouldDownload: boolean = false;
  public title: string = "";
  public updatedAt: Date = new Date();
	
  public static create(id: string): Promise<Episode> {
		throw new Error('Method not implemented.' + id);
	}
	
  public static async destroyAll(): Promise<void> {
		// TODO: move these to repository
	}

  public async download(): Promise<void> {
    throw new Error("Not Implemented");
  }
  
  public static findOne(arg0: { where: { title: string; }; }): Episode | PromiseLike<Episode> {
	  throw new Error('Method not implemented.' + arg0);
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