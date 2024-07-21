<script lang="ts">
	import type { PageData } from './$types';
	import { selectedCourse } from '../store';
	import filter from '$lib/images/filter-solid.svg';
	import { goto, invalidateAll } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	export let data: PageData;
	$: ({ courses } = data);
	const subjects = [
		'Toán',
		'Văn',
		'Tiếng Anh',
		'Lịch Sử',
		'Địa Lí',
		'Sinh Học',
		'Vật Lý',
		'Hóa Học'
	];
	let sortMenu = false;
	let subjectSelector = subjects;
	let courseSelector: string[] = [];
	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);

		return () => clearInterval(interval);
	});
	selectedCourse.set(courseSelector);
</script>

<svelte:head>
	<title>Góc học tập</title>
</svelte:head>

<section class="">
	<!-- <div class="flex h-[92svh] w-screen items-center justify-center">
		<p class="animate-bounce text-3xl font-semibold">LOADING...</p>
	</div> -->
	<div class="sticky top-0 z-50 flex h-[60px] items-center bg-slate-100 px-[100px] shadow-md">
		<button
			on:click|once={() => {
				subjectSelector = [];
			}}
			on:click={() => {
				sortMenu = !sortMenu;
			}}><img class="w-[30px]" src={filter} alt="Filter" /></button
		>
		{#if sortMenu}
			<div
				class="absolute top-[70px] grid grid-cols-2 gap-2 rounded-xl bg-slate-50 px-[20px] py-[15px] pt-[40px] shadow-lg"
			>
				<h1 class="absolute left-[20px] top-[10px] text-xl font-medium">Bộ lọc</h1>
				{#each subjects as subject}
					<label class="inline-flex cursor-pointer items-center justify-center">
						<input
							type="checkbox"
							value={subject}
							class="peer sr-only"
							on:click={() => {
								if (subjectSelector.includes(subject)) {
									subjectSelector.splice(subjectSelector.indexOf(subject), 1);
								} else {
									subjectSelector.push(subject);
								}
								console.log(subjectSelector);
							}}
						/>
						<span
							class="peer-focus:ring- tex peer relative flex h-7 w-24 select-none items-center justify-center rounded-full border-[3px] border-gray-300 bg-gray-100 text-sm font-medium text-gray-500 peer-checked:border-violet-500 peer-checked:bg-violet-400 peer-checked:text-violet-900"
							>{subject}</span
						>
					</label>
				{/each}
			</div>
		{/if}

		<span>Đã chọn:</span>
		<button
			class=""
			on:click={() => {
				selectedCourse.subscribe((value) => {
					goto('/study' + (value[0] == undefined ? '' : '/' + value[0]));
				});
			}}>Học những bài đã chọn</button
		>
	</div>

	<div class=" mt-[8svh] flex flex-wrap justify-center gap-10">
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

					<label class="absolute -right-2 -top-2 inline-flex cursor-pointer items-center">
						<input
							type="checkbox"
							value={course.id}
							class="peer sr-only"
							on:click={() => {
								if (courseSelector.includes(course.id)) {
									courseSelector.splice(courseSelector.indexOf(course.id), 1);
								} else {
									courseSelector.push(course.id);
								}
								console.log(courseSelector);
							}}
						/>
						<div
							class="peer-focus:ring- peer relative h-8 w-8 rounded-full bg-gray-200 peer-checked:bg-violet-500 peer-checked:ring"
						></div>
					</label>
				</div>
			{/if}
		{/each}
	</div>
</section>
