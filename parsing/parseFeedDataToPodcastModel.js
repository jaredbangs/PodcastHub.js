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

module.exports = async function (data) {
	
  return new Promise(async (resolve, reject) => {
	
    models.sequelize.sync();

    try {

      var parsedData = await parseToJSON(data);
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
              resolve(savedPodcast);
            });
        });


    } catch(err) {
      reject(err);
    }
  });

}
