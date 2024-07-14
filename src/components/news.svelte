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
		biden: {
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
		const response = await fetch('/api/news');
		const result = await response.json();

		// Cache result
		localStorage.setItem(
			'newsData',
			JSON.stringify({ data: result, timestamp: new Date().getTime() })
		);

		return result;
	}

	function updateTrends() {
		// Create a bar chart with two values: data.trump.averageSentiment, and data.biden.averageSentiment
		// Make sure that negative values are shown as well
		const sentimentData = [
			{ name: 'Trump', value: data.trump.averageSentiment, color: 'rgb(255, 118, 118)' },
			{ name: 'Biden', value: data.biden.averageSentiment, color: 'rgb(118, 118, 255)' }
		];

		const margin = { top: 20, right: 40, bottom: 30, left: 40 };
		const width = 644 - margin.left - margin.right;
		const height = 100 - margin.top - margin.bottom;

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
			g
				.attr('transform', `translate(0,${height})`)
				.call((g) => g.select('.domain').remove());

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
            .call(d3.axisBottom(x).tickValues([-1, -0.5, 0, 0.5, 1]))

		svg.append('g').call(xAxis);

		svg.append('g').call(yAxis);
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
</script>

<div id="newsTrends">
	<h5>News Trends</h5>

	<div id="sentiment">
		<p>Average news sentiment from the past 7 days</p>
	</div>
</div>

<style>
	* {
		text-align: center;
	}
</style>
