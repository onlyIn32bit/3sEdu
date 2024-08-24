<script lang="ts">
	import type { PageData } from './$types';
	import { db, user } from '$lib/firebase';
	import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
	import { fade, fly } from 'svelte/transition';
	import Alert from '$lib/components/Alert.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	$: ({ posts } = data);

	let title: string;
	let subject: string;
	let content: string;
	let formPanel = false;
	let displayAlert = false;
	let alertContent = '';
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

	$: orderTime = time.getTime();

	const createNewPost = () => {
		let post = {
			author: $user?.displayName as string,
			content: content as string,
			replies: [],
			subject: subject as string,
			timestamp: currentTime as string,
			order: orderTime as number,
			title: title as string
		};
		const docRef = addDoc(collection(db, 'posts'), post);
		console.log('posted');
		formPanel = false;
		invalidateAll();
		alertContent = 'Đã đăng bài viết thành công!';
		displayAlert = true;
		setTimeout(() => {
			displayAlert = false;
			alertContent = '';
		}, 3000);
	};

	function deletePost(id) {
		deleteDoc(doc(db, 'posts', id));
		invalidateAll();
		// alert('Đã xóa bài viết');
		alertContent = 'Đã xóa bài viết thành công!';
		displayAlert = true;
		setTimeout(() => {
			displayAlert = false;
			alertContent = '';
		}, 3000);
	}
</script>

<svelte:head>
	<title>Diễn đàn</title>
</svelte:head>

<section class="px-52">
	{#if !$user}
		<div
			class="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center text-2xl"
		>
			Đang tải<span class="loading loading-spinner loading-md ml-4"></span>
		</div>
	{:else}
		<button
			class="btn my-4"
			on:click={() => {
				formPanel = !formPanel;
			}}
			>Tạo bài viết
		</button>
		{#if formPanel}
			<div
				class="fixed left-1/2 top-1/2 z-20 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-slate-50 px-8 py-5 shadow-2xl"
				transition:fade
			>
				<button
					class="btn btn-circle btn-sm ml-auto"
					on:click={() => {
						formPanel = false;
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<form class="flex flex-col justify-center gap-3" on:submit|preventDefault={createNewPost}>
					<h2 class="self-center text-2xl font-semibold">Tạo bài viết mới</h2>
					<input
						class="input input-md input-bordered"
						type="text"
						placeholder="Nhập tiêu đề bài viết"
						required
						bind:value={title}
					/>

					<label>
						<div class="label">
							<span class="label-text">Chủ đề môn học</span>
						</div>

						<select class="select select-bordered select-md" bind:value={subject}>
							<option value="Toán">Toán</option>
							<option value="Ngữ Văn">Ngữ Văn</option>
							<option value="Tiếng Anh">Tiếng Anh</option>
							<option value="Lịch Sử">Lịch Sử</option>
							<option value="Địa Lý">Địa Lý</option>
							<option value="Sinh Học">Sinh Học</option>
							<option value="Vật Lý">Vật Lý</option>
							<option value="Hóa Học">Hóa Học</option>
						</select>
					</label>
					<textarea
						class="textarea textarea-bordered textarea-md"
						name="replyContent"
						placeholder="Nhập nội dung bài viết"
						required
						bind:value={content}
					></textarea>
					<button class="btn btn-primary" type="submit">Post</button>
				</form>
			</div>
			<button
				class="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-900 bg-opacity-20 backdrop-blur"
				on:click={() => (formPanel = false)}
				transition:fade
			></button>
		{/if}

		<div class="flex flex-col gap-8">
			{#each posts as post}
				<div class="relative flex gap-10 rounded-md bg-slate-100 px-10 py-7 shadow-lg">
					{#if post.data.author == $user?.displayName}
						<button class="absolute right-5 top-4 text-red-500" on:click={() => deletePost(post.id)}
							>Xóa bài viết này</button
						>
					{/if}
					<div
						class="flex w-[170px] flex-col items-center justify-center gap-2 rounded-md bg-slate-50 px-[20px] py-[10px] shadow-md"
					>
						<h2>Đăng bởi:</h2>
						<img
							class="w-[90px] rounded-full"
							src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
							alt="Default Avatar"
						/>
						<h2 class="w-[150px] overflow-hidden text-ellipsis text-wrap text-slate-700">
							{post.data.author}
						</h2>
					</div>
					<div>
						<h2 class="text-bold text-2xl">{post.data.title}</h2>
						<span>Môn học: {post.data.subject}</span>
						<p class="text-lg">Nội dung: {post.data.content}</p>
						<h2 class="mt-4 text-slate-600">Thời gian đăng: {post.data.timestamp}</h2>
						<div class="rounded-xl bg-slate-50 px-[30px] py-[15px]">
							<div class="flex items-center gap-16">
								<h2 class="text-lg">Phần thảo luận</h2>
								<form on:submit|preventDefault={() => {}} class="ml-auto flex justify-center gap-4">
									<input
										type="text"
										name="reply"
										class="input input-bordered"
										placeholder="Nhập câu trả lời"
									/>
									<button class="btn">Thêm câu trả lời</button>
								</form>
							</div>
							<div class="flex flex-col gap-5">
								{#each post.data.replies as reply}
									<div class="mt-4 rounded-lg bg-violet-50 px-[20px] py-[10px]">
										<div class="flex items-center">
											<h3 class="text-xl font-medium">Người trả lời: {reply.author}</h3>
											<span class="ml-[20px] font-light text-slate-600">lúc {reply.timestamp}</span>
										</div>
										<p class="text-lg">Nội dung: {reply.content}</p>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		{#if displayAlert}
			<Alert type="success" content={alertContent} />
		{/if}
	{/if}
</section>
