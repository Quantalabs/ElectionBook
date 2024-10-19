import fetch from 'node-fetch';
import { parse } from 'csv-parse';

export const GET = async () => {
	const response = await fetch("https://projects.fivethirtyeight.com/polls/data/favorability_polls.csv")
		.then((res) => res.text())
		.then((text) => parse(text, { columns: true, skip_empty_lines: true }));
	return new Response(JSON.stringify(response));
};

export const config = {
	runtime: 'nodejs18.x'
};
