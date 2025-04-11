<script lang="ts">
	import pkg from '../../../package.json';
	import './app.css';
</script>

<main>
	<!-- FIXME Hyperlink does not work in Google Chrome. -->
	{pkg.name} by <a href="https://github.com/hyunbinseo">{pkg.author}</a>
</main>

<style>
	main {
		padding: 2rem;
	}
</style>
