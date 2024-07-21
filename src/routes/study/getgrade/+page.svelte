<script lang="ts">
	let grade;
	const submitGrade = () => {
		console.log(grade);
	};
</script>

<section>
	<div>
		<div>
			<h1>Hãy chọn khối lớp của bạn</h1>
			<p>Có thể thay đổi sau trong phần cài đặt</p>
		</div>
		<div>
			<select name="class" bind:value={grade}>
				<option value="6">Lớp 6</option>
				<option value="7">Lớp 7</option>
				<option value="8">Lớp 8</option>
				<option value="9">Lớp 9</option>
			</select>
			<button on:click={submitGrade}>Tiếp theo</button>
		</div>
	</div>
</section>
