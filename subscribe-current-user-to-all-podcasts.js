#!/usr/bin/env node

var addSubscription = require('./actions/add-subscription');
var models = require('./models');
var podcastIterator = require('./actions/podcastIterator');

var subscribeAll = async function () {

  var currentUser = await models.User.loadCurrentUser(); 

  podcastIterator(async function (podcast) {
    return await addSubscription(currentUser, podcast.id); 
  });

}

subscribeAll();
