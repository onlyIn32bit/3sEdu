<script lang="ts">
	import '../app.css';
	import { user } from '$lib/firebase';
	import logo from '$lib/images/icon.png';
</script>

<div>
	<nav class="flex h-[8svh] items-center justify-center gap-4 bg-slate-50 py-3 lg:px-20 xl:px-40">
		<a class="flex items-center justify-center" href="/">
			<img class="w-[70px]" src={logo} alt="logo" />
			<span class="text-sm">3sEdu</span>
		</a>
		<div class="inline-block h-[25px] w-[1px] rounded-sm bg-slate-400"></div>
		<div class="flex gap-4 2xl:gap-8">
			<a
				class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
				href="/">Trang chủ</a
			>
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
		<div class="ml-auto flex items-center justify-center gap-4">
			{#if $user}
				<a
					class="text-lg font-medium text-slate-900 transition-all duration-200 hover:-translate-y-1 hover:text-slate-700"
					href="/settings">CÀI ĐẶT</a
				>
				<span class="text-lg">{$user.displayName}</span>
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
		</div>
	</nav>

	<main class="">
		<slot />
	</main>

	<!-- <footer>3sEdu</footer> -->
</div>

<style>
</style>
