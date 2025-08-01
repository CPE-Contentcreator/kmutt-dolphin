import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte()],
	base: 'https://CPE-Contentcreator.github.io/kmutt-dolphin/',
});
