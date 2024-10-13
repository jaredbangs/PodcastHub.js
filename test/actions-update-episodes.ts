let assert: Chai.AssertStatic;

import('chai').then((c) => {
  import('chai-datetime').then((cdt) => {
    c.use(cdt.default);
    assert = c.assert;
  });
});

import { AddPodcast } from '../actions/add-podcast';
import { FetchRssFile } from '../actions/fetchRssFile';
import { UpdateEpisodes } from '../actions/update-episodes';
import { Podcast } from '../models/podcast';

const addPodcast = new AddPodcast();
const fetchRssFile = new FetchRssFile();
const updateEpisodes = new UpdateEpisodes();

const fetchFirstRss = () => {
	return fetchRssFile.fetch('data-pla.xml');
}

const fetchUpdatedRss = () => {
	return fetchRssFile.fetch('data-pla-updated.xml');
}

describe('actions-update-episodes', function () {
	
	//this.timeout(30000);

	let allEpisodes;
	let originalId: any;
	let originalEpisodeCount: number;
	let podcast: Podcast;

	before(async () => {

		/*
		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);
		*/

		const podcastModel = await addPodcast.add('http://www.phonelosers.org/feed/', { fetchRss: fetchFirstRss });
		
		originalId = podcastModel._id;

		originalEpisodeCount = await podcastModel.countEpisodes();

		await updateEpisodes.update(podcastModel, { fetchRss: fetchUpdatedRss });
		
		allEpisodes = await podcastModel.getEpisodes();
	});

	it('original episode count', function () {
		assert.strictEqual(originalEpisodeCount, 5);
	});
  
	it('model is original model', function () {
    assert.strictEqual(podcast._id, originalId);
  });

	it('updated episode count', function () {
		console.log("Checking ep count");
    assert.strictEqual(allEpisodes.length, 11);
  });
  
	it('updated', function () {
    assert.equalDate(podcast.LastUpdated, new Date("2018-11-03 15:03:22"));
  });
})
