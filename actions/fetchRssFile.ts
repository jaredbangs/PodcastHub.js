import { promises as fsp } from 'fs';

import { FetchRss } from "./fetchRss";

export class FetchRssFile implements FetchRss {

  public async fetch(source: string): Promise<any> {
    return await fsp.readFile(source, 'utf8');
  }
}
