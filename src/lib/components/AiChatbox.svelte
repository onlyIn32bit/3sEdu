<script>
	import Movable from './Movable.svelte';
	import { marked } from 'marked';
	import { model } from '$lib/utils';

	let prompt;
	let answer = '';

	async function getAnswer() {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		answer = response.text();
	}
</script>

<Movable left="100" top="200">
	<div class="z-auto h-[50svh] w-96 select-none overflow-auto rounded-md bg-slate-50 p-8 shadow-lg">
		<form class="" on:submit|preventDefault={getAnswer}>
			<label>
				<div class="label"><span class="label-text">Nhập câu hỏi:</span></div>
				<input name="prompt" type="text" class="input input-md" bind:value={prompt} />
			</label>
			<button class="btn btn-primary">Gửi</button>
		</form>
		<h1 class="mt-[10px] text-2xl font-semibold">Câu trả lời:</h1>

		<div class="prose prose-sm mt-4">
			{answer ? '' : 'Chưa có câu trả lời'}{@html marked(answer)}
		</div>
	</div>
</Movable>
