#!/usr/bin/env node

import { AddPodcast } from "./actions/add-podcast";

const rssUrl: string | undefined = process.argv[2];

new AddPodcast().add(rssUrl, {}, (err: any) => {

	if (err) {
		console.error(err);
	}
});
