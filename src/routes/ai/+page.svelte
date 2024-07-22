<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	export let data: PageData;
	$: ({ answer } = data);
</script>

<div class="body">
	<a href="https://3sedu.edu.vn" class="rounded-full p-[7px] px-[10px] py-[7px] font-semibold ring"
		>QUAY VỀ</a
	>
	<form method="POST" class="mt-6 rounded-md bg-slate-50 p-[20px] shadow-lg">
		<label>
			<span class="text-xl font-medium">Nhập câu hỏi:</span>
			<input name="prompt" type="text" class="w-[500px] rounded-md p-[4px] shadow-lg" />
		</label>
		<button
			class="w-[100px] select-none rounded-xl bg-violet-500 px-[10px] py-[5px] text-lg font-medium text-gray-50 shadow-md transition-all duration-300 hover:bg-violet-400"
			>enter</button
		>
	</form>
	<h1 class="mt-[10px] text-2xl font-semibold">Câu trả lời:</h1>
	<div class="mt-[5px] text-xl">{@html marked(answer)}</div>
</div>

<style>
	.body {
		max-width: 800px;
		margin: 0 auto;
		margin-top: 20px;
	}
	.body form {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.body form button {
		margin-left: 10px;
	}
	.body form input {
		flex: 1;
	}
	.body form label {
		margin-right: 10px;
	}
</style>
