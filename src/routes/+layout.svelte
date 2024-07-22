<script lang="ts">
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import logo from '$lib/images/icon.png';

	let loggedIn = '';
	let displayname = 'loading...';
	onAuthStateChanged(auth, (user) => {
		if (user) {
			displayname = user.displayName;
			loggedIn = 'yes';
		} else {
			displayname = 'Khách';
			loggedIn = 'no';
		}
	});
	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div>
	<!-- <nav class="flex h-[8svh] items-center justify-center gap-4 bg-slate-50 px-40 py-3">
		<a class="flex items-center justify-center" href="/">
			<img class="w-[70px]" src={logo} alt="logo" />
			<span class="text-sm">3sEdu</span>
		</a>
		<div class="inline-block h-[25px] w-[1px] rounded-sm bg-slate-400"></div>
		<div class="flex gap-4">
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/docs">Tư liệu học tập</a
			>
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/forum">Diễn đàn</a
			>
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/tools">Công cụ hỗ trợ</a
			>
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/study">Góc học tập</a
			>
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/ai">AI</a
			>
		</div>
		<div class="ml-auto flex items-center gap-4">
			{#if loggedIn == 'yes'}
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/settings">CÀI ĐẶT</a
				>
			{:else if loggedIn == 'no'}
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/auth/login">ĐĂNG NHẬP</a
				>
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/auth/signup">ĐĂNG KÍ</a
				>
			{/if}
			<span>{displayname}</span>
		</div>
	</nav> -->

	<main class="">
		<slot />
	</main>

	<!-- <footer>3sEdu</footer> -->
</div>

<style>
</style>
