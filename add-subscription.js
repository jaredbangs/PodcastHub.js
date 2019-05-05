#!/usr/bin/env node

var addSubscription = require('./actions/add-subscription');

var podcastId = process.argv[2];

var models = require('./models');

var addSubscriptionForCurrentUser = async function (podcastId) {
  return await addSubscription(models.User.loadCurrentUser(), podcastId); 
}

try {
  addSubscriptionForCurrentUser(podcastId); 
} catch (err) {
  console.error(err);
}
