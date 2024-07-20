<script lang="ts">
	import heroPic from '$lib/images/main-pic.webp';
	import arrow from '$lib/images/icon_arrow.svg';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Trang chủ</title>
	<meta name="description" content="Trang chủ 3sEdu" />
</svelte:head>

<section>
	<div class="flex h-[92svh] items-center justify-center">
		<div class="flex items-center">
			<img class="w-[50svh]" src={heroPic} alt="Hero Section" />
			<div class="">
				<h1 class="text-6xl font-extrabold leading-[80px]">HỌC TẬP, CHIA SẺ</h1>
				<h1 class="text-6xl font-extrabold leading-[80px]">KIẾN THỨC, PHÁT TRIỂN</h1>
				<p class="text-lg">3sEdu mang đến cho bạn những cách học chất lượng nhất</p>
				<button
					class="flex w-[390px] items-center rounded-full bg-violet-700 p-[5px] pl-[20px] text-4xl font-extrabold text-white"
					on:click={() => {
						goto('/study');
					}}>BẮT ĐẦU NGAY <img class="ml-auto w-[70px]" src={arrow} alt="Arrow" /></button
				>
			</div>
		</div>
	</div>
</section>
