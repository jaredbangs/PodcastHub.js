let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

import { promises as fsp } from 'fs';
import path from 'path';

import { ParseFeedDataToJSON } from "../parsing/parseFeedDataToJSON";
const parser = new ParseFeedDataToJSON();

describe('parsing-xml-to-json-pla', function () {

  let parsedFile: any;

  before(async () => {
		const data: any = await fsp.readFile(path.resolve(__dirname, './data-pla.xml'), 'utf8');
    parsedFile = await parser.parse(data);
  });
  
  it('author', () => {
    assert.strictEqual(parsedFile.author, "RedBoxChiliPepper");
  });
 
  it('categories', () => {
    assert.strictEqual(parsedFile.categories.length, 3);
    assert.strictEqual(parsedFile.categories[0], "Comedy");
  });
  
  it('copyright', () => {
    assert.strictEqual(parsedFile.copyright, undefined);
  });

  it('description long', () => {
    assert.strictEqual(parsedFile.description.long, 'home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', () => {
    assert.strictEqual(parsedFile.description.short, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('episode 0 categories', () => {
    assert.strictEqual(parsedFile.episodes[0].categories.length, 1);
    assert.strictEqual(parsedFile.episodes[0].categories[0], "Snow Plow Show");
  });

  it('episode 0 description', () => {
    assert.strictEqual(parsedFile.episodes[0].description, "This is a live show that happened on Sunday afternoon where me and Carlito climbed into the corporate PLA helicopter to fly around…");
  });

  it('episode 0 duration', () => {
    assert.strictEqual(parsedFile.episodes[0].duration, undefined);
  });

  it('episode 0 enclosure filesize', () => {
    assert.strictEqual(parsedFile.episodes[0].enclosure.filesize, 69923821);
  });

  it('episode 0 enclosure type', () => {
    assert.strictEqual(parsedFile.episodes[0].enclosure.type, "audio/mpeg");
  });

  it('episode 0 enclosure url', () => {
    assert.strictEqual(parsedFile.episodes[0].enclosure.url, "http://media.blubrry.com/phonelosers/snowplowshow.com/episodes/2018-10-14_TSPS504_Helicopter_Rides_With_Brad_and_Carlito_LQ.mp3");
  });

  it('episode 0 guid', () => {
    assert.strictEqual(parsedFile.episodes[0].guid, "http://snowplowshow.com/?p=844");
  });

  it('episode 0 image', () => {
    assert.strictEqual(parsedFile.episodes[0].image, undefined);
  });
  
  it('episode 0 published', () => {
    assert.equalDate(parsedFile.episodes[0].published, new Date("2018-10-16 15:03:22"));
  });

  it('episode 0 title', () => {
    assert.strictEqual(parsedFile.episodes[0].title, "TSPS Episode 504 – Helicopter Rides With Brad and Carlito");
  });

  it('episode count', () => {
    assert.strictEqual(parsedFile.episodes.length, 5);
  });

  it('image', () => {
    assert.strictEqual(parsedFile.image, 'http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', () => {
    assert.strictEqual(parsedFile.language, 'en-us');
  });

  it('link', () => {
    assert.strictEqual(parsedFile.link, 'http://www.phonelosers.org');
  });

  it('title', () => {
    assert.strictEqual(parsedFile.title, 'Phone Losers of America');
  });
  
  it('updated', () => {
    assert.equalDate(parsedFile.updated, new Date("2018-10-16 15:03:22"));
  });
})
