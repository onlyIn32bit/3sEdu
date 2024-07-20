<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	let loggedIn: boolean;
	let displayname;
	onAuthStateChanged(auth, (user) => {
		if (user) {
			displayname = user.displayName;
			loggedIn = true;
		} else {
			displayname = undefined;
			loggedIn = false;
		}
	});
</script>

<div>
	<nav class="flex h-[8svh] items-center justify-center gap-4 bg-slate-50 px-40 py-3">
		<a class="flex" href="/">
			<img class="" src="" alt="logo-placeholder" />
			<span>3sEdu</span>
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
			{#if loggedIn}
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/settings">CÀI ĐẶT</a
				>
			{:else}
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/auth/login">ĐĂNG NHẬP</a
				>
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/auth/signup">ĐĂNG KÍ</a
				>
			{/if}
			{#if $page.url.pathname === '/'}
				<div class="greet">
					Xin chào, <span id="user-name">{displayname == undefined ? 'Khách' : displayname}</span>
				</div>
			{/if}
		</div>
	</nav>

	<main class="px-52">
		<slot />
	</main>

	<footer></footer>
</div>

<style>
</style>
