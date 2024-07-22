<script lang="ts">
	import type { PageData } from './$types';
	import { auth, db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { collection, addDoc, deleteDoc, doc, query, orderBy, getDocs } from 'firebase/firestore';
	import { invalidateAll } from '$app/navigation';
	let posts;
	async function load() {
		const q = query(collection(db, 'posts'), orderBy('order', 'desc'));
		const querySnapshot = await getDocs(q);
		posts = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
	}
	load();
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
	$: orderTime = time.getTime();
	onMount(() => {
		const interval = setInterval(() => {
			user = auth.currentUser;
			time = new Date();
			// invalidateAll();
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
			order: orderTime as number,
			title: title as string
		};
		const docRef = addDoc(collection(db, 'posts'), post);
		console.log('posted');
		location.reload();
	};
</script>

<svelte:head>
	<title>Diễn đàn</title>
</svelte:head>

<section data-sveltekit-reload class="px-52">
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
				class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-slate-900 bg-opacity-40"
			>
				<div class="z-20 flex w-96 flex-col rounded-2xl bg-slate-50 px-8 py-5 shadow-2xl">
					<button
						class="ml-auto"
						on:click={() => {
							formPanel = !formPanel;
						}}
						>Hủy
					</button>
					<form class="flex flex-col justify-center gap-3" on:submit|preventDefault={createNewPost}>
						<h2 class="self-center text-2xl font-semibold">Tạo bài viết mới</h2>
						<input
							class="mb-6 block w-full rounded-lg border border-gray-300 p-2"
							type="text"
							placeholder="Nhập tiêu đề bài viết"
							required
							bind:value={title}
						/>

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
							class="mb-6 block h-80 w-full resize-none rounded-lg border border-gray-300 p-2"
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
				<div class="relative flex gap-10 rounded-md bg-slate-100 px-10 py-7 shadow-lg">
					{#if post.data.author == user.displayName}
						<button
							class="absolute right-5 top-4 text-red-500"
							on:click={() => {
								deleteDoc(doc(db, 'posts', post.id));
								alert('Đã xóa bài viết');
							}}>Xóa bài viết này</button
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
						<h2 class="text-semibold text-2xl">{post.data.title}</h2>
						<span>Môn học: {post.data.subject}</span>
						<p class="text-lg">Nội dung: {post.data.content}</p>
						<h2 class="mt-4 text-slate-600">Thời gian đăng: {post.data.timestamp}</h2>
						<div class="w-[60vw] rounded-xl bg-slate-50 px-[30px] py-[15px] shadow-lg">
							<div class="flex items-center">
								<h2 class="text-lg">Phần thảo luận</h2>
								<form on:submit|preventDefault={() => {}} class="ml-auto flex justify-center gap-4">
									<input
										type="text"
										name="reply"
										class="block w-full rounded-xl border border-gray-300 p-2"
										placeholder="Nhập câu trả lời"
									/>
									<button
										class="w-[300px] select-none rounded-xl bg-violet-500 px-[10px] py-[5px] text-lg font-medium text-gray-50 shadow-md transition-all duration-300 hover:bg-violet-400"
										>Thêm câu trả lời</button
									>
								</form>
							</div>
							<div class="mt-[10px] flex flex-col gap-5">
								{#each post.data.replies as reply}
									<div class="rounded-lg bg-violet-50 px-[20px] py-[10px]">
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
	{/if}
</section>
