<script lang="ts">
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import Bar from './bar.svelte';

	const generateColorHex = (x: number, y: number) => {
		const delta = Math.abs(x - y);
		const maxVal = Math.max(x, y);
		const deltaNorm = delta / maxVal;
		const red = x > y ? 255 : Math.round(255 * (1 - deltaNorm));
		const green = x > y ? Math.round(255 * (1 - deltaNorm)) : Math.round(255 * (1 - deltaNorm));
		const blue = x > y ? Math.round(255 * (1 - deltaNorm)) : 255;
		return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
	};

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
	let bidenData: {
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

	onMount(async () => {
		let us = JSON.parse(localStorage.getItem('statesTopoJSON') || '{}');

		if (Object.keys(us).length === 0) {
			us = await fetch('/topojson/states-albers-10m.json').then((d) => d.json());
			localStorage.setItem('statesTopoJSON', JSON.stringify(us));
		}

		states = topojson.feature(us, us.objects.states).features;

		let cachedData = JSON.parse(localStorage.getItem('IbR') || '{}');

		// Check if data is less than a day old
		if (cachedData && Date.now() - Number(cachedData.timestamp) < 1000 * 60 * 60 * 24) {
			trumpData = cachedData.trump;
			bidenData = cachedData.biden;
		} else {
			trumpData = await fetch('/api/IbR?keyword=trump&geo=US&time=30').then((d) => d.json());
			bidenData = await fetch('/api/IbR?keyword=biden&geo=US&time=30').then((d) => d.json());

			localStorage.setItem(
				'IbR',
				JSON.stringify({ trump: trumpData, biden: bidenData, timestamp: Date.now() })
			);

			console.log('Reset cached data.');
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
			for (let data of bidenData) {
				if (data.geoName === name) {
					values.push(Number(data.value));
				}
			}

			let sum = values[0] + values[1];
			color = generateColorHex(values[0], values[1]);
			overlay[name] = [color, Math.max(...values), [values[0] / sum, values[1] / sum]];
		}
	});
</script>

<h5 style="text-align: center;">Trump vs. Biden</h5>
<p style="text-align: center;">As per google search trends over the past 30 days</p>
<svg viewBox="0 0 975 610">
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
	</g>

	{#if selected}
		<path d={path(selected)} fill="hsl(0 0% 50% / 20%)" stroke="black" stroke-width={2} />
	{/if}
</svg>
<div class="selectedName">
	{#if selected}
		{selected.properties.name}
		<br />
		<br />
		<Bar data={overlay[selected.properties.name][2]} colors={['#FF0000', '#0000FF']} />
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
