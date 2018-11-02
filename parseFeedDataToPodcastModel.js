var parsePodcast = require('node-podcast-parser');

var models = require('./models');
var parseToJSON = require('./parseFeedDataToJSON');

module.exports = function (data, callback) {
	
  var self = this;
	
	models.sequelize.sync();

  parseToJSON(data, function (err, parsedData) {
    if (err) {
      callback(err);
    } else {

			models.Podcast.create({ 
				author: parsedData.author, 
				image: parsedData.image, 
				language: parsedData.language, 
				link: parsedData.link, 
				title: parsedData.title, 
				LastUpdated: parsedData.updated,
				ParsedFeedCache: parsedData,
				}).then(function (podcast) {
			
					if (parsedData.description !== undefined) {
						podcast.descriptionLong = parsedData.description.long;
						podcast.descriptionShort = parsedData.description.short;
					}

					if (parsedData.episodes !== undefined) {
			
						parsedData.episodes.forEach(function (parsedEpisode) {

							models.Episode.create({ 
								description: parsedEpisode.description, 
								duration: parsedEpisode.duration, 
								guid: parsedEpisode.guid, 
								image: parsedEpisode.image, 
								published: parsedEpisode.published, 
								title: parsedEpisode.title 
								}).then(function (episode) {

									if (parsedEpisode.enclosure !== undefined) {
										episode.enclosureType = parsedEpisode.enclosure.type;
										episode.enclosureUrl = parsedEpisode.enclosure.url;
										episode.fileSize = parsedEpisode.enclosure.filesize;
									}
								
									episode.setPodcast(podcast);
									episode.save();
							});

						});
					}

					podcast.save().then(function () {
						callback(null, podcast);
					});
			});
    }
  });

}
