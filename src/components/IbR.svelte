<script lang="ts">
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath } from 'd3-geo';
	import * as d3 from 'd3';
	import { draw } from 'svelte/transition';
	import Bar from './bar.svelte';

	function generateColor(redScore: number, blueScore: number) {
		if (redScore > blueScore && redScore - blueScore > 10) {
			return 'rgb(255, 118, 118)';
		} else if (blueScore > redScore && blueScore - redScore > 10) {
			return 'rgb(118, 118, 255)';
		} else if (redScore > blueScore) {
			return 'rgb(198, 118, 175)';
		} else if (blueScore > redScore) {
			return 'rgb(130, 118, 244)';
		} else {
			return 'rgb(70, 35, 209)';
		}
	}

	const path = geoPath().projection(null);

	let states: {
		type: 'Feature';
		id: string;
		properties: {
			name: string;
		};
		geometry: {
			type: 'Polygon';
			coordinates: number[][];
		};
	}[] = [];
	let selected: {
		type: 'Feature';
		id: string;
		properties: {
			name: string;
		};
		geometry: {
			type: 'Polygon';
			coordinates: number[][];
		};
	};
	let tabbed: {
		type: 'Feature';
		id: string;
		properties: {
			name: string;
		};
		geometry: {
			type: 'Polygon';
			coordinates: number[][];
		};
	};

	let trumpData: {
		geoCode: string;
		geoName: string;
		value: [number];
		formattedValue: [string];
		maxValueIndex: number;
		hasData: [boolean];
	}[];
	let harrisData: {
		geoCode: string;
		geoName: string;
		value: [number];
		formattedValue: [string];
		maxValueIndex: number;
		hasData: [boolean];
	}[];
	let overlay: {
		[key: string]: [string, number, [number, number]];
	} = {};

	let today = new Date();
	export let start = new Date(today.setDate(today.getDate() - 30)).getTime();
	let startTime = new Date(start);
	let shouldBeStart = new Date(new Date().setDate(today.getDate() - 30));
	startTime.setHours(0, 0, 0, 0);
	shouldBeStart.setHours(0, 0, 0, 0);
	let endTime = new Date(new Date(startTime).getTime() + 30 * 24 * 60 * 60 * 1000).getTime();

	onMount(async () => {
		let us = JSON.parse(localStorage.getItem('statesTopoJSON') || '{}');

		if (Object.keys(us).length === 0) {
			us = await fetch('/topojson/states-albers-10m.json').then((d) => d.json());
			localStorage.setItem('statesTopoJSON', JSON.stringify(us));
		}

		states = topojson.feature(us, us.objects.states).features;

		let value = startTime.getTime() == shouldBeStart.getTime() ? 'IbR' : 'IbR-2020';

		let cachedData = JSON.parse(localStorage.getItem(value) || '{}');
		let query = '&geo=US&time=30&endTime=' + endTime;

		// Check if data is less than a day old
		if (cachedData && Date.now() - Number(cachedData.timestamp) < 1000 * 60 * 60 * 24) {
			trumpData = cachedData.trump;
			harrisData = cachedData.harris;
		} else {
			let cache = true;
			try {
				trumpData = await fetch('/api/IbR?keyword=Trump' + query).then((d) => d.json());
				harrisData = await fetch('/api/IbR?keyword=Harris' + query).then((d) => d.json());

				if (trumpData.message == 'Internal Error' || harrisData.message == 'Internal Error') {
					throw 'No Data';
				}
			} catch (e) {
				cache = false;
				if (cachedData) {
					cache = true;
					trumpData = cachedData.trump;
					harrisData = cachedData.harris;
				}
			}
			if (cache) {
				localStorage.setItem(
					value,
					JSON.stringify({ trump: trumpData, harris: harrisData, timestamp: Date.now(), query })
				);

				console.log('Reset cached data.');
			}
		}

		for (const state of states) {
			const name = state.properties.name;

			let values = [];
			let color;

			for (let data of trumpData) {
				if (data.geoName === name) {
					values.push(Number(data.value));
				}
			}
			for (let data of harrisData) {
				if (data.geoName === name) {
					values.push(Number(data.value));
				}
			}

			let sum = values[0] + values[1];
			color = generateColor(values[0], values[1]);
			overlay[name] = [color, Math.max(...values), [values[0] / sum, values[1] / sum]];
		}

		function handleZoom(e) {
			d3.select('svg g').attr('transform', e.transform);
		}

		let zoom = d3
			.zoom()
			.scaleExtent([1, 5])
			.translateExtent([
				[0, 0],
				[975, 610]
			])
			.on('zoom', handleZoom);

		d3.select('#IbR').call(zoom);
	});
</script>

<svg viewBox="0 0 975 610" id="IbR">
	<!-- State shapes -->
	<g fill="white" stroke="black">
		{#each states as feature, i}
			<path
				d={path(feature)}
				on:click={() => (selected = feature)}
				class="state"
				in:draw={{ delay: i * 10, duration: 1000 }}
				fill={overlay[feature.properties.name] ? overlay[feature.properties.name][0] : 'white'}
				role="button"
				tabindex="0"
				aria-label={feature.properties.name}
				on:focus={() => (tabbed = feature)}
				on:keyup={(e) => {
					if (e.key === 'Enter' && tabbed === feature) {
						selected = feature;
					}
				}}
			/>
		{/each}
		{#if selected}
			<path d={path(selected)} fill="hsl(0 0% 50% / 20%)" stroke="black" stroke-width={2} />
		{/if}
	</g>
</svg>
<div class="selectedName">
	{#if selected}
		{selected.properties.name}
		<br />
		<br />
		<Bar data={overlay[selected.properties.name][2]} colors={['#ff7676', '#7676ff']} />
		{Math.round(overlay[selected.properties.name][2][0] * 100)} : {Math.round(
			overlay[selected.properties.name][2][1] * 100
		)}
	{/if}
</div>

<style>
	.state:hover {
		fill: hsl(0 0% 50% / 20%);
	}

	.selectedName {
		text-align: center;
		margin-top: 8px;
		font-size: 1.5rem;
	}
</style>
