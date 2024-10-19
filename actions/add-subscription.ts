import { Podcast } from "../models/podcast";
import { User } from "../models/user";
import { Logger } from "../logger";
import { SubscriptionRepository } from "../repositories/subscriptionRepository";
import { Subscription } from "../models/subscription";
const logger = Logger.logger;

export class AddSubscription {

  private readonly subscriptionRepository = new SubscriptionRepository();

  public async add(user: User, podcast: Podcast): Promise<Subscription> {
  
    let subscription = await this.subscriptionRepository.getSubscriptionForUserAndPodcast(user, podcast);
    
    if (subscription === undefined) {
      
      subscription = new Subscription(user, podcast);

      await this.subscriptionRepository.save(subscription);
      
      logger.info("Subscription to " + podcast.title + " added for " + user.name);
    
    } else {
      logger.info("Already subscribed to " + podcast.title + " - " + podcast.RssUrl);
    }
    
    return subscription;
  
  }

}
