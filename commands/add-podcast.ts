#!/usr/bin/env node

import { AddPodcast } from "../actions/add-podcast";

const rssUrl: string | undefined = process.argv[2];

if (rssUrl !== undefined) {
	new AddPodcast().add(rssUrl);
}