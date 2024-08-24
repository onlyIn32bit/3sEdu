<script lang="ts">
	import { marked } from 'marked';
	import { model } from '$lib/utils';

	let prompt;
	let answer = '';
	let loading = false;

	async function getAnswer() {
		answer = '';
		loading = true;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		answer = response.text();
		if (answer != '') loading = false;
	}
</script>

<svelte:head>
	<title>AI</title>
</svelte:head>

<div class="px-80">
	<form class="mt-6 w-fit rounded-md bg-slate-50 p-8" on:submit|preventDefault={getAnswer}>
		<label>
			<div class="label"><span class="label-text">Nhập câu hỏi:</span></div>
			<input
				name="prompt"
				type="text"
				class="input input-md input-bordered w-96"
				bind:value={prompt}
			/>
		</label>
		<button class="btn btn-primary">enter</button>
	</form>
	<h1 class="mt-[10px] text-2xl font-semibold">Câu trả lời:</h1>

	<div class="prose prose-xl my-4">
		{#if loading}
			<div class="flex items-center gap-4">
				<span class="loading loading-dots loading-md"></span>
				<span>Đang tải câu trả lời</span>
			</div>
		{/if}
		{@html marked(answer)}
	</div>
</div>
