// import { Logger } from "../logger";

import { Podcast } from "../models/podcast";
import { ParseFeedDataToPodcastModel } from "../parsing/parseFeedDataToPodcastModel";
import { PodcastRepository } from "../repositories/podcastRepository";
import { FetchRss } from "./fetchRss";
import { FetchRssLive } from "./fetchRssLive";

export class AddPodcast {

  private readonly fetchRss: FetchRss = new FetchRssLive();

  private readonly repository = new PodcastRepository();

  private readonly parser = new ParseFeedDataToPodcastModel();

  public async add(rssUrl: string, fetcher?: () => Promise<any>): Promise<Podcast> {

    if (fetcher === undefined) {
      fetcher = async () => {
        return await this.fetchRss.fetch(rssUrl);
      }
    }

    try {
      const existingPodcast = await this.repository.findByRssUrl(rssUrl);
      return existingPodcast;
    } catch {

      const data = await fetcher();

      if (data !== undefined) {
        
        const newPodcast = await this.parser.parse(data);

        await this.repository.save(newPodcast);

        return newPodcast;

      } else {
        throw new Error("No data fetched");
      }

    }

  }
}