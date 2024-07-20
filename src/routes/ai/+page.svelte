<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	export let data: PageData;
	$: ({ answer } = data);
</script>

<div class="body">
	<form method="POST">
		<label>
			Prompt
			<input name="prompt" type="text" />
		</label>
		<button>enter</button>
	</form>

	<div>{@html marked(answer)}</div>
</div>

<style>
	.body {
		max-width: 800px;
		margin: 0 auto;
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
