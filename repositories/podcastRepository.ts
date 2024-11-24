import { Podcast } from '../models/podcast';
import { Repository } from './repository';

export class PodcastRepository extends Repository<Podcast> {

    constructor(databaseName: string = "podcasts") {
        super(databaseName, () => new Podcast());
    }

   	public async findByRssUrl(rssUrl: string): Promise<Podcast> {

        await this.db.createIndex({ // if does not exist
            index: {fields: ['RssUrl']}
        });

        const matchArray = await this.findByRequest({
            selector: {
                RssUrl: {$eq: rssUrl}
            }
        });

        if (matchArray !== undefined && matchArray[0] !== undefined) {
            return matchArray[0];
        } else {
            throw new Error("Not Found");
        }

	}

   	public async findByTitle(title: string): Promise<Podcast[]> {

        await this.db.createIndex({ // if does not exist
            index: {fields: ['title']}
        });

        return await this.findByRequest({
            selector: {
                title: {$eq: title}
            }
        });
	}
}