import { AddPodcast } from "../actions/add-podcast";
import { FetchRssFile } from "../actions/fetchRssFile";
import { Podcast } from "../models/podcast";

//import { expect } from "chai";
let assert: Chai.AssertStatic;
let expect: Chai.ExpectStatic;

import('chai').then((c) => {
  
  import('chai-datetime').then((cdt) => {
    
    c.use(cdt.default);
    assert = c.assert;
    expect = c.expect;
  });
});

const fetchRss = () => {
	return new FetchRssFile().fetch('data-pla.xml');
}

const addPodcast = new AddPodcast();

describe('actions-add-podcast', () => {
	
	//this.timeout(30000);

  let podcast: Podcast;

  before(async () => {

    /*
		Bluebird.all([
			models.sequelize.sync(),
      //models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);
    */

		podcast = await addPodcast.add('http://www.phonelosers.org/feed/', { fetchRss: fetchRss });
  });
  
	it('model is saved', () => {
    assert.notStrictEqual(podcast.id, 0);
  });

	it('author', () => {
    expect(podcast.author).equal("RedBoxChiliPepper");
  });
/*  
  it('categories', function () {
    assert.strictEqual(podcast.categories.length, 3);
    assert.strictEqual(podcast.categories[0], "Comedy");
  });
*/  
  it('copyright', () => {
    expect(podcast.copyright).equal(undefined);
  });

  it('description long', () => {
    expect(podcast.descriptionLong).equal('home of The Snow Plow Show wacky morning podcast');
  });

  it('description short', () => {
    expect(podcast.descriptionShort).equal('Prank phone calls and other wacky morning humor by the people at Phone Losers of America');
  });

  it('image', () => {
    expect(podcast.image).equal('http://www.phonelosers.org/images/site_images/podcast_2018_art_3000x3000.jpg');
  });
  
  it('language', () => {
    expect(podcast.language).equal('en-us');
  });
  
	it('link', () => {
    expect(podcast.link).equal('http://www.phonelosers.org');
  });

  it('title', () => {
    expect(podcast.title).equal('Phone Losers of America');
  });
  
	it('updated', () => {
    expect(podcast.LastUpdated).equal(new Date("2018-10-16 15:03:22"));
  });
})
