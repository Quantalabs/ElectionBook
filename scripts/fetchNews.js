import fetch from 'node-fetch';
import fs from 'fs';

// Get APIKey from command line argument
const APIKey = process.argv[2];
let aweekago = new Date();
aweekago.setDate(new Date().getDate() - 7);
const tUrl = `https://api.worldnewsapi.com/search-news?text=Donald+Trump&language=en&number=50&api-key=${APIKey}&earliest-publish-date=${aweekago.toISOString().split('T')[0]}&sort-direction=DESC&sort=publish-time`;
const bUrl = `https://api.worldnewsapi.com/search-news?text=Joe+Biden&language=en&number=50&api-key=${APIKey}&earliest-publish-date=${aweekago.toISOString().split('T')[0]}&sort-direction=DESC&sort=publish-time`;

fetch(tUrl, {
	method: 'GET'
})
	.then((response) => response.json())
	.then((data) => {
		fs.writeFileSync('static/trumpNews.json', JSON.stringify(data));
	})
	.then(() => {
		fetch(bUrl, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				fs.writeFileSync('static/bidenNews.json', JSON.stringify(data));
			});
	});
