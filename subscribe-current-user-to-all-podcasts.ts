#!/usr/bin/env node

import { AddSubscription } from "./actions/add-subscription";
import { PodcastIterator } from "./actions/podcastIterator";

//var models = require('./models');

const subscribeAll = async function () {

  const currentUser = await models.User.loadCurrentUser(); 

  const addSubscription = new AddSubscription(); 

  new PodcastIterator().iterate(async (podcast: any) => {
    return await addSubscription.add(currentUser, podcast.id); 
  });

}

subscribeAll();
