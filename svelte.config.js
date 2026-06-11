// See https://github.com/wxt-dev/wxt/issues/2236

/** @type {import('@sveltejs/vite-plugin-svelte').Options} */
const config = {
	compilerOptions: {
		experimental: { async: true },
	},
};

export default config;
