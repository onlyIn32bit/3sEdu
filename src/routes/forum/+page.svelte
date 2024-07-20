<script lang="ts">
	import type { PageData } from './$types';
	import { auth, db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { collection, addDoc } from 'firebase/firestore';
	import { invalidateAll } from '$app/navigation';
	export let data: PageData;
	$: ({ posts } = data);
	let title: string;
	let subject: string;
	let content: string;
	let formPanel = false;
	let user = auth.currentUser;
	let time = new Date();
	$: currentTime =
		time.getHours() +
		':' +
		time.getMinutes() +
		', ' +
		time.getDate() +
		'/' +
		time.getMonth() +
		'/' +
		time.getFullYear();
	onMount(() => {
		const interval = setInterval(() => {
			user = auth.currentUser;
			time = new Date();
			invalidateAll();
		}, 1000);

		return () => clearInterval(interval);
	});

	const createNewPost = () => {
		let post = {
			author: user?.displayName as string,
			content: content as string,
			replies: [],
			subject: subject as string,
			timestamp: currentTime as string,
			title: title as string
		};
		const docRef = addDoc(collection(db, 'posts'), post);
		console.log('posted');
		alert('posted');
	};

	const deletePost = () => {};
</script>

<svelte:head>
	<title>Diễn đàn</title>
</svelte:head>

<section data-sveltekit-reload>
	{#if user == undefined}
		<h1 class="text-center text-2xl">Đang tải...</h1>
	{:else}
		<button
			on:click={() => {
				formPanel = !formPanel;
			}}
			>Tạo bài viết
		</button>
		{#if formPanel}
			<div
				class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-slate-900 bg-opacity-40"
			>
				<div class="flex w-96 flex-col rounded-2xl bg-slate-50 px-8 py-5 shadow-2xl">
					<button
						class="ml-auto"
						on:click={() => {
							formPanel = !formPanel;
						}}
						>Hủy
					</button>
					<form class="flex flex-col justify-center gap-3" on:submit|preventDefault={createNewPost}>
						<h2 class="self-center text-2xl font-semibold">Tạo bài viết mới</h2>
						<input type="text" placeholder="Nhập tiêu đề bài viết" required bind:value={title} />

						<label
							>Chủ đề môn học<select class="" bind:value={subject}>
								<option value="Toán">Toán</option>
								<option value="Ngữ Văn">Ngữ Văn</option>
								<option value="Tiếng Anh">Tiếng Anh</option>
								<option value="Lịch Sử">Lịch Sử</option>
								<option value="Địa Lý">Địa Lý</option>
								<option value="Sinh Học">Sinh Học</option>
								<option value="Vật Lý">Vật Lý</option>
								<option value="Hóa Học">Hóa Học</option>
							</select></label
						>
						<textarea
							class="h-80 resize-none"
							name="replyContent"
							placeholder="Nhập nội dung bài viết"
							required
							bind:value={content}
						></textarea>
						<button
							class="h-7 rounded-lg bg-violet-500 text-white shadow-xl transition-all duration-300 hover:bg-violet-600"
							type="submit">Post</button
						>
					</form>
				</div>
			</div>
		{/if}

		<div class="flex flex-col gap-8">
			{#each posts as post}
				<div class="relative flex gap-10 rounded-md bg-slate-100 px-10 py-7">
					{#if post.author == user.displayName}
						<button class="absolute right-5 top-4 text-red-500" on:click={() => {}}
							>Xóa bài viết này</button
						>
					{/if}
					<div class="flex flex-col items-center justify-center gap-2">
						<h2>Đăng bởi:</h2>
						<img
							class="w-[90px] rounded-full"
							src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
							alt="Default Avatar"
						/>
						<h2 class="text-slate-700">{post.author}</h2>
					</div>
					<div>
						<h2 class="text-semibold text-2xl">{post.title}</h2>
						<span>Môn học: {post.subject}</span>
						<p>Nội dung: {post.content}</p>
						{#each post.replies as reply}
							<div>
								<h3>{reply.author}</h3>
								<span>{reply.timestamp}</span>
								<p>{reply.content}</p>
							</div>
						{/each}
						<h2 class="mt-4 text-slate-600">Thời gian đăng: {post.timestamp}</h2>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
