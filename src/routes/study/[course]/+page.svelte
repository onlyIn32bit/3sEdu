<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { courseStores } from '$lib/stores/course';
	import { goto } from '$app/navigation';
	import AiChatbox from '$lib/components/AiChatbox.svelte';

	export let data: PageData;

	let buttonContent = 'Bài học kế tiếp';

	console.log($courseStores);
</script>

<svelte:head>
	<title>Bài học: {data.title}</title>
</svelte:head>

<div class="sticky top-0 flex h-[60px] items-center bg-slate-100 px-[200px] shadow-md">
	<h1>{data.title}</h1>
	<button
		class="ml-auto select-none rounded-xl bg-violet-500 px-[10px] py-[5px] text-lg font-medium text-gray-50 shadow-md"
		on:click={() => {
			courseStores.set([...$courseStores.slice(1, $courseStores.length)]);
			if ($courseStores.length == 1) {
				$courseStores[1] = '';
				buttonContent = 'Kết thúc bài học';
			}
			goto('/study/' + $courseStores[0]);
		}}
		>{buttonContent}
	</button>
</div>
<div class="center prose prose-xl absolute left-1/2 mt-4 -translate-x-1/2">
	{@html data.content ? data.content : 'Không có nội dung'}
</div>
