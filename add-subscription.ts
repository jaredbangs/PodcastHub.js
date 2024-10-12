#!/usr/bin/env node

import { AddSubscription } from "./actions/add-subscription";

const podcastId = process.argv[2];

const addSubscriptionForCurrentUser = async (podcastId: any) => {
  return await new AddSubscription().add(models.User.loadCurrentUser(), podcastId); 
}

try {
  addSubscriptionForCurrentUser(podcastId); 
} catch (err) {
  console.error(err);
}
