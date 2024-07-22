<script lang="ts">
	import type { PageData } from './$types';
	import { selectedCourse } from '../../store';
	import { goto } from '$app/navigation';
	export let data: PageData;
	$selectedCourse;
	let buttonContent = 'Bài học kế tiếp';
</script>

<svelte:head>
	<title>Bài học: {data.title}</title>
</svelte:head>

<div class="sticky top-0 z-50 flex h-[60px] items-center bg-slate-200 px-[200px] shadow-md">
	<h1>{data.title}</h1>
	<button
		class="ml-auto select-none rounded-xl bg-violet-500 px-[10px] py-[5px] text-lg font-medium text-gray-50 shadow-md"
		on:click={() => {
			$selectedCourse =
				$selectedCourse.length == 1 ? [] : [...$selectedCourse.slice(1, $selectedCourse.length)];
			goto('/study/' + ($selectedCourse[0] == undefined ? '' : $selectedCourse[0]));
		}}
		>{buttonContent}
	</button>
</div>
<div>{@html data.content}</div>
