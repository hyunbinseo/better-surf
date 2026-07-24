<script lang="ts">
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import { onMount } from 'svelte';
	import { safeParse, type InferOutput } from 'valibot';
	import './tailwind.css';
	import { RESOURCE_TYPES, UsageSchema, type ResourceType } from './valibot';

	let isUpdating = $state(false);
	let usage = $state<InferOutput<typeof UsageSchema>>();

	const update = async () => {
		isUpdating = true;
		try {
			const response = await fetch('https://api.freet.co.kr/mypage/usage', {
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.status === 401) {
				window.location.href = 'https://www.freet.co.kr/login';
				return;
			}

			if (!response.ok) {
				window.alert(`요청 실패 (${response.status} ${response.statusText})`);
				return;
			}

			const result = safeParse(UsageSchema, await response.json());

			if (!result.success) {
				console.error(result.issues);
				window.alert('응답 형식이 올바르지 않습니다');
				return;
			}

			usage = result.output;
		} finally {
			isUpdating = false;
		}
	};

	onMount(update);

	const resourcesMap: Record<ResourceType, { ko: string; fmt: (input: number) => string }> = {
		DATA: {
			ko: '데이터', // KB (e.g. 20971520 = 20GB)
			fmt: (kb: number) => `${(kb / 1024 / 1024).toFixed(1)}GB`,
		},
		SMS: {
			ko: '문자',
			fmt: (n: number) => `${n}건`,
		},
		VOICE: {
			ko: '음성', // second (e.g. 30000 = 500분)
			fmt: (sec: number) => `${Math.round(sec / 60)}분`,
		},
	};
</script>

{#if !usage}
	<span>불러오는 중…</span>
{:else}
	<main class="w-fit">
		<header class="flex items-center gap-x-2">
			<h1 class="mr-auto">프리티 사용량 조회</h1>
			<span class="text-sm">{usage.updatedAt.toLocaleTimeString('ko-KR')} 기준</span>
			<button type="button" onclick={update} disabled={isUpdating}>
				<RotateCcw size={15} />
			</button>
		</header>
		<hr class="my-3" />
		<table>
			<thead>
				<tr>
					<th class="text-right">구분</th>
					<th class="text-right">잔여량</th>
					<th></th>
					<th class="text-left">제공량</th>
				</tr>
			</thead>
			<tbody>
				{#each RESOURCE_TYPES as resourceType}
					{#each usage[resourceType] as item, index}
						<tr>
							{const resource = resourcesMap[resourceType]}
							<td class="text-right">{resource.ko} {index || null}</td>
							<td class="text-right">{resource.fmt(item.remaining)}</td>
							<td>{item.bar}</td>
							<td>{resource.fmt(item.total)}</td>
						</tr>
					{/each}
				{/each}
			</tbody>
		</table>
	</main>
{/if}

<style>
	:global(html) {
		background-color: white;
	}
	:global(body) {
		width: 100%;
		height: 100%;
		margin: calc(var(--spacing) * 4);
	}
	th,
	td {
		padding-inline: calc(var(--spacing) * 2.5);
		padding-block: calc(var(--spacing) * 1);
	}
</style>
