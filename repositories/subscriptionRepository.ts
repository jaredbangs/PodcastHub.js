import { Podcast } from '../models/podcast';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';
import { PodcastRepository } from './podcastRepository';
import { Repository } from './repository';
import { SavableItem } from './savableItem';
import { UserRepository } from './userRepository';

export class SubscriptionRepository extends Repository<Subscription> {
    
    private static readonly podcastRepository = new PodcastRepository();
    private static readonly userRepository = new UserRepository();

    constructor(databaseName: string = "subscriptions") {
        super(databaseName, () => new Subscription());
    }
	
    public async getSubscriptionsForPodcast(podcast: Podcast): Promise<Subscription[]> {

        await this.db.createIndex({ // if does not exist
            index: {fields: ['podcast_id']}
        });

        return await this.findByRequest({
            selector: {
                podcast_id: {$eq: podcast._id}
            }
        });
	}

	public async getSubscriptionForUserAndPodcast(user: User, podcast: Podcast): Promise<Subscription | undefined> {

        const subscriptions = await this.getSubscriptionsForUser(user);

        const arrayEntry = subscriptions.find((s) => s.podcast_id === podcast._id);

        if (arrayEntry === undefined){
            return undefined;
        } else if (arrayEntry instanceof Subscription) {
            return arrayEntry;
        } else if ((arrayEntry as SavableItem)._id !== undefined) {
            return await this.load((arrayEntry as SavableItem)._id);
        } else {
            return undefined;
        }
	}

	public async getSubscriptionsForUser(user: User): Promise<Subscription[]> {

        await this.db.createIndex({ // if does not exist
            index: {fields: ['user_id']}
        });

        return await this.findByRequest({
            selector: {
                user_id: {$eq: user._id}
            }
        });
	}

    public override async save(item: Subscription): Promise<void> {
        
        if (item.podcast_id !== "" && item.user_id !== "") {

            if (!(await SubscriptionRepository.podcastRepository.has(item.podcast_id))) {
                throw new Error("Subscriptions require an already saved podcast");
            }

            if (!(await SubscriptionRepository.userRepository.has(item.user_id))) {
                throw new Error("Subscriptions require an already saved user");
            }

            await super.save(item);
        } else {
            throw new Error("Subscriptions require a user and podcast before saving");
        }

    }

}