<script lang="ts">
	import { onMount } from 'svelte';
	import IbR from '../components/IbR.svelte';
	import IoT from '../components/IoT.svelte';
	import News from '../components/news.svelte';

	let showIoT = true; // Show IoT component by default
	let isPortrait = false;
	let show2020 = false;

	function toggleComponent() {
		showIoT = !showIoT;
	}

	function show2020Map() {
		show2020 = !show2020;
	}

	onMount(() => {
		checkOrientation();
		window.addEventListener('resize', checkOrientation);

		let colors = [
			"#f38ba8",
			"#7676ff",
			"#eba0ac",
			"#74c7ec",
			"#fab387",
			"#89dceb",
			"#f9e2af",
			"#94e2d5",
		];

		let highlight = document.getElementsByClassName("highlight");
		for (var i = 0; i < highlight.length; i++) {
			highlight[i].style.color = colors[i];
		}

		let highlightBg = document.getElementsByClassName("highlight_bg");
		for (var i = 0; i < highlightBg.length; i++) {
			highlightBg[i].style.backgroundColor = colors[(i+1)%colors.length];
		}
	});

	function checkOrientation() {
		if (window.innerHeight > window.innerWidth) {
			isPortrait = true;
		} else {
			isPortrait = false;
		}
	}
</script>

{#if isPortrait}
	<div class="landscape-message">Please view website in landscape</div>
{:else}
	<div>
		<div id='page1'>
		<div style="margin-left: auto; margin-right: auto;">
		<h1><span id="election">Election</span><span id="book">Book</span></h1>
		<p>Using the internet to look at political trends across the nation.</p>

		<h4 style="text-align: center;">Who Is More <span class="highlight">Popular?</span></h4>
		<p style="text-align: center;">As per google search trends over the past 30 days</p>

		<div class="button-container">
			<button class="toggle-button highlight_bg" on:click={toggleComponent}>
				{#if showIoT}
					Show Interest by Region
				{:else}
					Show Interest over Time
				{/if}
			</button>
		</div>

		<div class="container">
			{#if showIoT}
				<div class="item" id="IoT-holder">
					<IoT />
				</div>
			{:else if show2020}
				<div class="item" id="IbR-holder">
					<IbR start={new Date(Date.now() - 4 * 365 * 24 * 60 * 60 * 1000).getTime()} />
				</div>
				<button class="toggle-button" on:click={show2020Map}>Compare with Current Data</button>
			{:else}
				<div class="item" id="IbR-holder">
					<IbR />
				</div>
				<button class="toggle-button" on:click={show2020Map}>Compare with 2020 Data</button>
			{/if}
			</div>
		</div>
		</div>
		<div class="container" style="justify-content: center; height: 100vh; padding-bottom: 0;">
			<h2>The <span class='highlight'>News</span></h2>
			<div class="item" id="news-holder">
				<News />
			</div>
		</div>
	</div>
{/if}

<style>
	#page1{
		height: 100vh;
		display: flex;
		align-items: center;
	}
	h1 {
		text-align: center;
		margin-bottom: 10px;
	}
	p {
		text-align: center;
		margin-bottom: 20px;
	}
	.button-container {
		text-align: center;
		margin-bottom: 20px;
	}
	.toggle-button {
		background-color: #ffffff;
		color: #222222;
		border: 1px solid #ffffff;
		padding: 10px 20px;
		font-size: 1.2rem;
		cursor: pointer;
		border-radius: 5px;
	}
	.toggle-button:hover {
		background-color: #c9c9c9;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 20px;
	}
	.item {
		width: 200%;
		max-width: 800px; /* Adjust the maximum width as needed */
	}
	@media (min-width: 768px) {
		.container {
			flex-direction: column;
		}
	}
	.landscape-message {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-size: 2rem;
		color: #c9c9c9;
		text-align: center;
		background-color: #222222;
	}

	#election {
		color: rgb(255, 118, 118);
	}
	#book {
		color: rgb(118, 118, 255);
	}
</style>
