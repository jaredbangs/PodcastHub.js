'use strict';

import { PodcastRepository } from "../repositories/podcastRepository";
import { SavableItemBase } from "../repositories/savableItem";
import { UserRepository } from "../repositories/userRepository";
import { UUID } from "../util/uuid";
import { Podcast } from "./podcast";
import { User } from "./user";

export class Subscription extends SavableItemBase {
  
  private static readonly podcastRepository = new PodcastRepository();
  private static readonly userRepository = new UserRepository();

  public lastUpdated_ISOString: string = "";
  public podcast_id: string = "";
  public user_id: string = "";
  
  constructor(user?: User, podcast?: Podcast, id: string = UUID.random()){
    super(id);
    this.LastUpdated = new Date();
    
    if (user !== undefined) {
      this.user_id = user._id;
    }
    if (podcast !== undefined) {
      this.podcast_id = podcast._id;
    }
  }
  
  public get LastUpdated(): Date {
    return new Date(this.lastUpdated_ISOString);
  }
  public set LastUpdated(val: Date) {
    this.lastUpdated_ISOString = val.toISOString();
  }
  
  public async getPodcast(): Promise<Podcast> {
    return await Subscription.podcastRepository.load(this.podcast_id);
  }
  
  public async getUser(): Promise<User> {
    return await Subscription.userRepository.load(this.user_id);
  }
  
}
