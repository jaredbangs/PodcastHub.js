#!/usr/bin/env node

import { AddPodcast } from "../actions/add-podcast";
import { AddSubscription } from "../actions/add-subscription";
import { UserRepository } from "../repositories/userRepository";

const podcastUrl = process.argv[2];

const userRepository = new UserRepository();

const addPodcastAction = new AddPodcast();

const addSubscriptionForCurrentUser = async (url: string) => {

  const user = await userRepository.loadCurrentUser();

  const podcast = await addPodcastAction.add(url); 

  return await new AddSubscription().add(user, podcast); 
}

if (podcastUrl !== undefined) {

  try {
    addSubscriptionForCurrentUser(podcastUrl); 
  } catch (err) {
    console.error(err);
  }
}
