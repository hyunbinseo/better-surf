<script lang="ts">
	import pkg from '../../../package.json';
	import './app.css';
</script>

<main>
	{pkg.name} by <a href="https://github.com/hyunbinseo">{pkg.author}</a>
</main>

<style>
	main {
		padding: 2rem;
	}
</style>
