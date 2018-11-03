var models = require('../models');
var parseToJSON = require('./parseFeedDataToJSON');

var addParsedEnclosureToEpisode = function (episode, parsedEnclosure) {

	if (parsedEnclosure !== undefined) {
		episode.enclosureType = parsedEnclosure.type;
		episode.enclosureUrl = parsedEnclosure.url;
		episode.fileSize = parsedEnclosure.filesize;
	}
}

var addParsedEpisodeToPodcast = function (podcast, parsedEpisode) {

	podcast.createEpisode({ 
		description: parsedEpisode.description, 
		duration: parsedEpisode.duration, 
		guid: parsedEpisode.guid, 
		image: parsedEpisode.image, 
		published: parsedEpisode.published, 
		title: parsedEpisode.title 
		}).then(function (episode) {

			addParsedEnclosureToEpisode(episode, parsedEpisode.enclosure);
			return episode.save();
	});
}

module.exports = function (data, callback) {
	
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
							addParsedEpisodeToPodcast(podcast, parsedEpisode);
						});
					}

					podcast.save().then(function (savedPodcast) {
						callback(null, savedPodcast);
					});
			});
    }
  });

}
