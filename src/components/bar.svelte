<script lang="ts">
	export let data: number[];
	export let colors: string[];

	import { onMount } from 'svelte';

	function bar(data: number[]) {
		let bar = document.getElementById('bar');

		if (!bar) {
			return;
		}

		for (let i = 0; i < data.length; i++) {
			let newElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			if (i === 0) {
				newElement.setAttribute('x', '15');
				newElement.setAttribute('y', '0');
				newElement.setAttribute('width', `${data[i] * 20}`);
				newElement.setAttribute('height', '2');
				newElement.setAttribute('fill', colors[i]);
			} else {
				newElement.setAttribute('x', `${data[i - 1] * 20 + 15}`);
				newElement.setAttribute('y', '0');
				newElement.setAttribute('width', `${data[i] * 20}`);
				newElement.setAttribute('height', '2');
				newElement.setAttribute('fill', colors[i]);
			}
			bar.appendChild(newElement);
		}
	}

	onMount(() => bar(data));
</script>

<svg viewBox="0 0 50 2" style="font-size: {2 / 3};" id="bar"> </svg>
