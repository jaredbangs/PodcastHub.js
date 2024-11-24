import { promises as fsp } from 'fs';
import path from 'path';
import { ChaiWrapper } from './chai-dynamic-import-wrapper';

import { Podcast } from '../models/podcast';
import { ParseFeedDataToPodcastModel } from '../parsing/parseFeedDataToPodcastModel';

const parser = new ParseFeedDataToPodcastModel();

describe('parsing-xml-to-podcast-model-pla', () => {
	
  let assert: Chai.AssertStatic;
	
  //this.timeout(30000);

  let podcast: Podcast;

  before(async () => {
    
    assert = await ChaiWrapper.importAssert();

		const data: any = await fsp.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8');
    podcast = await parser.parse(data);
  });
  
	it('author', () => {
    assert.strictEqual(podcast.author, "RedBoxChiliPepper");
  });
/*  
  it('categories', function () {
    assert.strictEqual(podcast.categories.length, 3);
    assert.strictEqual(podcast.categories[0], "Comedy");
  });
*/  
  it('copyright', () => {
    assert.strictEqual(podcast.copyright, undefined);
  });

  it('description long', () => {
    assert.strictEqual(podcast.descriptionLong, 'home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', () => {
    assert.strictEqual(podcast.descriptionShort, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('image', () => {
    assert.strictEqual(podcast.image, 'http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', () => {
    assert.strictEqual(podcast.language, 'en-us');
  });
  
	it('link', () => {
    assert.strictEqual(podcast.link, 'http://www.phonelosers.org');
  });

  it('title', () => {
    assert.strictEqual(podcast.title, 'Phone Losers of America');
  });
  
	it('updated type', () => {
    assert.strictEqual(typeof(podcast.LastUpdated), "object");
  });

	it('updated', () => {
    assert.equalDate(podcast.LastUpdated, new Date("2018-10-16 15:03:22"));
  });
})
