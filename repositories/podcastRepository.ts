import { Podcast } from '../models/podcast';
import { Repository } from './repository';

export class PodcastRepository extends Repository<Podcast> {

    constructor(databaseName: string = "podcasts") {
        super(databaseName);
    }
}