#!/usr/bin/env node

import { AddSubscription } from "../actions/add-subscription";
import { PodcastIterator } from "../actions/podcastIterator";
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

const subscribeAll = async function () {

  const currentUser = await userRepository.loadCurrentUser(); 

  const addSubscription = new AddSubscription(); 

  new PodcastIterator().iterate(async (podcast: any) => {
    return await addSubscription.add(currentUser, podcast.id); 
  });

}

subscribeAll();
