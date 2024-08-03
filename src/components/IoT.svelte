<script lang="ts">
	import { onMount } from 'svelte';
	import { line } from 'd3-shape';
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max } from 'd3-array';
	import { axisBottom, axisLeft } from 'd3-axis';
	import { select } from 'd3-selection';
	import 'd3-transition';

	let data: {
		time: Date;
		value: number;
	}[][] = [];
	let candidates = ['Joe Biden', 'Donald Trump', 'Kamala Harris', 'J. D. Vance'];
	let geo = 'US';
	let time = 30;

	async function fetchData() {
		const params = new URLSearchParams();
		candidates.forEach((candidate) => params.append('keyword', candidate));
		params.append('geo', geo);
		params.append('time', String(time));

		const response = await fetch(`/api/IoT?${params.toString()}`);
		const result = await response.json();
		data = transformData(result);

		// Cache the data with a timestamp
		const cacheData = {
			data: result,
			timestamp: new Date().getTime()
		};
		localStorage.setItem('iotData', JSON.stringify(cacheData));

		drawChart();
	}

	function transformData(
		result: {
			time: string;
			formattedTime: string;
			formattedAxisTime: string;
			value: number[];
			hasData: boolean[];
			formattedValue: string[];
		}[]
	) {
		// Transform the data into an array of objects for each candidate
		const transformed = candidates.map((_, index) => {
			return result.map((item) => ({
				time: new Date(Number(item.time) * 1000), // Convert time from seconds to milliseconds
				value: item.value[index]
			}));
		});
		return transformed;
	}

	function checkCache() {
		const cachedData = localStorage.getItem('iotData');
		if (cachedData != null) {
			const { data, timestamp } = JSON.parse(cachedData);
			const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
			const now = new Date().getTime();
			if (now - timestamp < oneDay) {
				return transformData(data);
			}
		}
		return null;
	}

	onMount(() => {
		const cachedData = checkCache();
		if (cachedData) {
			data = cachedData;
			drawChart();
		} else {
			fetchData();
		}
	});

	function drawChart() {
		const margin = { top: 20, right: 40, bottom: 30, left: 40 };
		const width = 975 - margin.left - margin.right;
		const height = 610 - margin.top - margin.bottom;

		const svg = select('#IoT')
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const x = scaleTime()
			.domain(extent(data[0], (d) => new Date(d.time)))
			.range([0, width]);

		const y = scaleLinear()
			.domain([0, max(data.flat(), (d) => d.value)])
			.nice()
			.range([height, 0]);

		svg.append('g').attr('transform', `translate(0,${height})`).call(axisBottom(x));

		svg.append('g').call(axisLeft(y));

		const lineGen = line<{ time: Date; value: number }>()
			.x((d) => x(d.time))
			.y((d) => y(d.value));

		// Create lines and circles for tooltips with animation
		candidates.forEach((n, index) => {
			if (!data[index]) return;
			console.log(data[index], index)

			let color = '#000';
      if (index === 0) color = '#76c1ff';
      if (index === 1) color = '#ff7676';
      if (index === 2) color = '#7676ff';
      if (index === 3) color = '#ffc176';
			
			const path = svg
				.append('path')
				.datum(data[index])
				.attr('fill', 'none')
				.attr('stroke', color)
				.attr('stroke-width', 1.5)
				.attr('d', lineGen);

			const totalLength = path.node().getTotalLength();

			path
				.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
				.attr('stroke-dashoffset', totalLength)
				.transition()
				.duration(2000)
				.attr('stroke-dashoffset', 0);

			svg
				.transition()
				.duration(1000)
				.delay((_, i) => i * 50);

			svg
				.selectAll(`circle-${index}`)
				.data(data[index])
				.enter()
				.append('circle')
				.attr('r', 6)
				.attr('cx', (d) => x(d.time))
				.attr('cy', (d) => y(d.value))
				.attr('fill', color)
				.attr('opacity', 0)
				.attr('opacity', 1)
				.on('mouseover', function (_, d) {
					select('.tooltip').style('display', 'block');
					select('#tooltip')
						.style('display', 'block')
						.text(`Candidate: ${n}. \n Time: ${new Date(d.time).toDateString()}`);
				})
				.on('mouseout', function () {
					select('#tooltip').style('display', 'none');
					select('.tooltip').style('display', 'none');
				});
		});
	}
</script>

<div class="svg-container">
	<svg id="IoT" viewBox="0 0 975 610"></svg>
	<div id="flex-contianer">
		<div class="tooltip">
			<div id="tooltip" style="display: none;"></div>
		</div>
	</div>
</div>

<style>
	#flex-contianer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.svg-container {
		text-align: center;
		position: relative;
	}
	.tooltip {
		display: none;
		position: absolute;
		background-color: #333;
		color: #fff;
		padding: 5px;
		border-radius: 5px;
		font-size: 12px;
		pointer-events: none;
		margin-top: 20px;
	}
</style>
