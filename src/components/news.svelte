<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let data: {
		trump: {
			averageSentiment: number;
			total: number;
			latest: {
				title: string;
				url: string;
				image: string;
				sentiment: number;
			}[];
		};
		harris: {
			averageSentiment: number;
			total: number;
			latest: {
				title: string;
				url: string;
				image: string;
				sentiment: number;
			}[];
		};
	};

	async function fetchData() {
		let resp = await fetch('/trumpNews.json');
		let trumpNews = await resp.json();
		let resp_2 = await fetch('/harrisNews.json');
		let harrisNews = await resp_2.json();

		let news = {
			trump: trumpNews,
			harris: harrisNews
		};

		let tAvgSent = 0;

		for (let i = 0; i < news.trump.news.length; i++) {
			tAvgSent += news.trump.news[i].sentiment;
		}

		tAvgSent = tAvgSent / news.trump.news.length;

		let bAvgSent = 0;

		for (let i = 0; i < news.harris.news.length; i++) {
			bAvgSent += news.harris.news[i].sentiment;
		}

		bAvgSent = bAvgSent / news.harris.news.length;

		let returnVal = {
			trump: {
				averageSentiment: tAvgSent,
				total: news.trump.avaliable,
				latest: news.trump.news.slice(0, 10)
			},
			harris: {
				averageSentiment: bAvgSent,
				total: news.harris.avaliable,
				latest: news.harris.news.slice(0, 10)
			}
		};

		for (let i = 0; i < 10; i++) {
			returnVal.trump.latest[i] = {
				title: returnVal.trump.latest[i].title,
				url: returnVal.trump.latest[i].url,
				image: returnVal.trump.latest[i].image,
				sentiment: returnVal.trump.latest[i].sentiment
			};
			returnVal.harris.latest[i] = {
				title: returnVal.harris.latest[i].title,
				url: returnVal.harris.latest[i].url,
				image: returnVal.harris.latest[i].image,
				sentiment: returnVal.harris.latest[i].sentiment
			};
		}

		return returnVal;
	}

	function updateTrends() {
		// Create a bar chart with two values: data.trump.averageSentiment, and data.harris.averageSentiment
		// Make sure that negative values are shown as well
		const sentimentData = [
			{ name: 'Trump', value: data.trump.averageSentiment, color: 'rgb(255, 118, 118)' },
			{ name: 'Harris', value: data.harris.averageSentiment, color: 'rgb(118, 118, 255)' }
		];

		const margin = { top: 20, right: 40, bottom: 30, left: 40 };
		const width = 644 - margin.left - margin.right;
		const height = 150 - margin.top - margin.bottom;

		const svg = d3
			.select('#sentiment')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const x = d3.scaleLinear().domain([-1, 1]).range([0, width]);

		const y = d3
			.scaleBand()
			.domain(sentimentData.map((d) => d.name))
			.range([0, height])
			.padding(0.5);

		const xAxis = (g) =>
			g.attr('transform', `translate(0,${height})`).call((g) => g.select('.domain').remove());

		const yAxis = (g) =>
			g.call(d3.axisLeft(y).tickSize(0)).call((g) => g.select('.domain').remove());

		svg
			.append('g')
			.selectAll('.bar')
			.data(sentimentData)
			.join('rect')
			.attr('class', (d) => `bar ${d.value < 0 ? 'negative' : ''}`)
			.attr('fill', (d) => d.color)
			.attr('x', (d) => x(Math.min(0, d.value)))
			.attr('y', (d) => y(d.name))
			.attr('width', (d) => Math.abs(x(d.value) - x(0)))
			.attr('height', y.bandwidth());

		// Outline x=0
		svg
			.append('line')
			.attr('x1', x(0))
			.attr('x2', x(0))
			.attr('y1', 0)
			.attr('y2', height)
			.attr('stroke', '#c9c9c9')
			.attr('stroke-width', 1);

		svg
			.append('line')
			.attr('x1', x(-1))
			.attr('x2', x(1))
			.attr('y1', height)
			.attr('y2', height)
			.attr('stroke', '#c9c9c9')
			.attr('stroke-width', 1);

		// Add ticks to x-axis
		svg
			.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(x).tickValues([-1, -0.5, 0, 0.5, 1]));

		svg.append('g').call(xAxis);

		svg.append('g').call(yAxis);

		for (const i of data.trump.latest) {
			let li = document.createElement('li');
			li.innerHTML = `<a href=${i.url}>${i.title}</a>`;

			document.getElementById('trumpArticles').appendChild(li);
		}

		for (const i of data.harris.latest) {
			let li = document.createElement('li');
			li.innerHTML = `<a href=${i.url}>${i.title}</a>`;

			document.getElementById('harrisArticles').appendChild(li);
		}
	}

	onMount(async () => {
		const cachedData = JSON.parse(localStorage.getItem('newsData') || '{}');
		if (cachedData && Date.now() - Number(cachedData.timestamp) < 1000 * 60 * 60 * 24) {
			data = cachedData.data;
		} else {
			data = await fetchData();
		}

		updateTrends();
	});

	let tDisplay = 'none';
	let bDisplay = 'block';
	function toggleNews() {
		if (tDisplay == 'none') {
			tDisplay = 'block';
			bDisplay = 'none';
		} else {
			tDisplay = 'none';
			bDisplay = 'block';
		}
	}
</script>

<div id="newsTrends">
	<h5>News Trends</h5>

	<div id="sentiment">
		<p>
			Average news sentiment from the past 7 days.<br />Ranges from -1 to 1; -1 is the most negative
			and 1 is the most positive.
		</p>
	</div>
</div>

<div id="news">
	<h5>
		Latest Articles Relating to {#if tDisplay == 'none'}
			Harris
		{:else}
			Trump
		{/if}
	</h5>
	<div style="display: {tDisplay}">
		<button on:click={toggleNews}>Show News on Harris</button>
		<ul id="trumpArticles"></ul>
	</div>
	<div style="display: {bDisplay}">
		<button on:click={toggleNews}>Show News on Trump</button>
		<ul id="harrisArticles"></ul>
	</div>
</div>

<style>
	* {
		text-align: center;
	}

	ul {
		text-align: left !important;
	}

	button {
		background-color: #ffffff;
		color: #222222;
		border: 1px solid #ffffff;
		padding: 10px 20px;
		font-size: 1.2rem;
		cursor: pointer;
		border-radius: 5px;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: auto;
		margin-right: auto;
	}
	button:hover {
		background-color: #c9c9c9;
		border: 1px solid #c9c9c9;
	}
</style>
