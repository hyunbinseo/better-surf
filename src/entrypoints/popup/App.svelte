<script lang="ts">
	import QRCode from 'qrcode-svg';
	import { browser } from 'wxt/browser';
	import './app.css';

	let value = $state('qr');
</script>

<main class="flex w-48 flex-col gap-y-4 p-4">
	<label>
		<span class="sr-only">기능</span>
		<select bind:value disabled class="w-full">
			<option value="qr">QR 코드 생성</option>
		</select>
	</label>
	{#if value === 'qr'}
		{#await browser.tabs.query({ active: true, currentWindow: true }) then tabs}
			{@const tab = tabs[0]}
			{#if tab && tab.url}
				{@html new QRCode({
					content: tab.url,
					padding: 0,
					ecl: 'M',
					join: true,
					xmlDeclaration: false,
					container: 'svg-viewbox',
				}).svg()}
			{/if}
		{/await}
	{/if}
</main>
