import { ChaiWrapper } from './chai-dynamic-import-wrapper';
import path from 'path';

import { AddPodcast } from '../actions/add-podcast';
import { FetchRssFile } from '../actions/fetchRssFile';
import { UpdateEpisodes } from '../actions/update-episodes';
import { Podcast } from '../models/podcast';
import { PodcastRepository } from '../repositories/podcastRepository';

const addPodcast = new AddPodcast();
const fetchRssFile = new FetchRssFile();
const updateEpisodes = new UpdateEpisodes();

const fetchFirstRss = async () => {
	return await fetchRssFile.fetch(path.resolve(__dirname, './data-pla.xml'));
}

const fetchUpdatedRss = async () => {
	return await fetchRssFile.fetch(path.resolve(__dirname, './data-pla-updated.xml'));
}

describe('actions-update-episodes', function () {
	
	let assert: Chai.AssertStatic;
	//this.timeout(30000);

	let allEpisodes: any;
	let originalId: any;
	let originalEpisodeCount: number;
	let podcastModelReloaded: Podcast;

	before(async () => {

		assert = await ChaiWrapper.importAssert();

		const podcastModel = await addPodcast.add('http://www.phonelosers.org/feed/', fetchFirstRss);
		
		originalId = podcastModel._id;

		const originalEpisodes = await podcastModel.getEpisodes();
		originalEpisodeCount = originalEpisodes.length;

		await updateEpisodes.update(podcastModel, fetchUpdatedRss);

		podcastModelReloaded = await new PodcastRepository().load(originalId);
		
		allEpisodes = await podcastModelReloaded.getEpisodes();
	});

	it('original episode count', function () {
		assert.strictEqual(originalEpisodeCount, 5);
	});
  
	it('model is original model', function () {
		assert.strictEqual(podcastModelReloaded._id, originalId);
	});

	it('updated episode count', function () {

		// Original file contains 5 episodes, new file contains 10, 6 of which are new
		assert.strictEqual(allEpisodes.length, 11);
  	});
  
	it('updated', function () {
    	assert.equalDate(podcastModelReloaded.LastUpdated, new Date("2018-11-03 15:03:22"));
  	});
})
