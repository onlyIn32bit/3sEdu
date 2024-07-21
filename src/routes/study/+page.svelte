<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ courses } = data);
	let subjectSelector = ['Toan'];
	let courseSelector = [];
	const selectCourse = (courseId) => {
		courseSelector.push(courseId);
	};
</script>

<section class="flex justify-center px-[50px]">
	<!-- <div class="flex h-[92svh] w-screen items-center justify-center">
		<p class="animate-bounce text-3xl font-semibold">LOADING...</p>
	</div> -->
	<div class="flex w-auto flex-wrap gap-10">
		{#each courses as course}
			{#if subjectSelector.includes(course.data.subject)}
				<div
					class="relative h-[300px] w-[450px] rounded-2xl bg-slate-100 p-[22px] has-[:checked]:bg-violet-100 has-[:checked]:ring"
				>
					<div
						class="absolute left-1/2 h-[190px] w-[90%] -translate-x-1/2 rounded-xl bg-white"
					></div>
					<div class="absolute bottom-4">
						<h1 class="text-2xl font-medium text-slate-800">{course.data.title}</h1>
						<h2 class="text-lg font-light text-slate-800">Môn học: {course.data.subject}</h2>
					</div>
					<div class="absolute bottom-4 right-8">
						<h2 class="text-lg font-light text-slate-800">Đánh giá: {course.data.rating}/10</h2>
					</div>
					<!-- <button
						class="absolute h-[50px] w-[50px] rounded-full bg-violet-500 focus:ring"
						on:click={() => {}}
					>
					</button> -->

					<label class="absolute -right-2 -top-2 inline-flex cursor-pointer items-center">
						<input type="checkbox" value={course.id} class="peer sr-only" />
						<div
							class="peer-focus:ring- peer relative h-8 w-8 rounded-full bg-gray-200 peer-checked:bg-violet-500 peer-checked:ring"
						></div>
					</label>
				</div>
			{/if}
		{/each}
	</div>
</section>
