<script lang="ts">
	import { onMount } from 'svelte';
	import map from './lib/map.jpg';

	let x = $state(0);
	let y = $state(0);
	let edit = $state(false);

	const mapClickHandler = (event: MouseEvent) => {
		const map = event.target as HTMLImageElement;
		const rect = map.getBoundingClientRect();
		const rawX = event.clientX - rect.left; // x position within the image
		const rawY = event.clientY - rect.top; // y position within the images

		x = Math.round((rawX / rect.width) * 100);
		y = Math.round((rawY / rect.height) * 100);

		window.history.replaceState({}, '', `?x=${x}&y=${y}`);
	};

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const xParam = params.get('x');
		const yParam = params.get('y');

		if (xParam && yParam) {
			x = parseInt(xParam, 10);
			y = parseInt(yParam, 10);
		}
	});
</script>

<main>
	<div>
		{#if !edit}
			<button class="edit-button" onclick={() => (edit = true)}>Edit</button>

			<button
				class="edit-button"
				onclick={() => {
					navigator.clipboard.writeText(window.location.href);
				}}
			>
				Copy Link
			</button>
		{:else}
			<button class="edit-button" onclick={() => (edit = false)}>Done</button>
		{/if}
	</div>

	<button class="map-container" onclick={mapClickHandler} disabled={!edit}>
		<img class="map" src={map} alt="KMUTT Map" />

		<div class="pin" style="left: {x}%; top: {y}%;"></div>
	</button>
</main>

<style>
	main {
		padding: 0.5rem;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	h1 {
		text-align: center;
		font-size: 1.5rem;
	}

	.edit-button {
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
	}

	.map-container {
		appearance: none;
		outline: none;
		position: relative;
		width: 100%;
		border: none;
		padding: 0;
	}

	.map {
		width: 100%;
		top: 0;
		left: 0;
		object-fit: contain;
	}

	.pin {
		position: absolute;
		width: 32px;
		height: 32px;
		transform: translate(-50%, -90%);
		background-image: url('./lib/pin.svg');
		background-size: 32px;
		background-repeat: no-repeat;
		background-position: center;

		animation: jump 1s ease-in-out infinite;
	}

	@keyframes jump {
		0% {
			transform: translate(-50%, -90%) translateY(0);
		}
		50% {
			transform: translate(-50%, -90%) translateY(-10px);
		}
		100% {
			transform: translate(-50%, -90%) translateY(0);
		}
	}
</style>
