var logger = require('../logger');
var models = require('../models');
models.sequelize.sync();

module.exports = function (user, podcastId) {

  return new Promise(async (resolve, reject) => {

    var podcast = await models.Podcast.findOne({ where: { id: podcastId }});

    if (podcast !== undefined && podcast !== null) {

      var subscription = await models.Subscription.findOne({ where: { PodcastId: podcastId, UserId: user.id }});
      
      if (subscription === undefined || subscription === null) {
        
        subscription = await models.Subscription.create();
        await subscription.setUser(user);
        await subscription.setPodcast(podcast);
        await subscription.save();
       
        logger.info("Subscription to " + podcast.title + " added for " + user.name);
        
        resolve(subscription);
      
      } else {
        reject(new Error("Already subscribed to " + podcast.title + " - " + podcast.RssUrl));
      }
    } else {
      reject(new Error("Podcast " + podcastId + " does not exist."));
    }

	});
}
