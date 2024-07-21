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
		<div class="flex items-center gap-[40px]">
			<img class="w-[400px]" src={heroPic} alt="Hero Section" />
			<div>
				<div class="flex flex-col items-start">
					<h1 class="text-6xl font-extrabold leading-[80px] text-violet-700">
						HỌC TẬP, <span class="text-purple-500">CHIA SẺ</span>
					</h1>
					<h1 class="text-6xl font-extrabold leading-[80px] text-violet-500">
						KIẾN THỨC, <span class="text-purple-400">PHÁT TRIỂN</span>
					</h1>
					<p class="text-xl text-slate-800">
						3sEdu mang đến cho bạn những cách học chất lượng nhất
					</p>
				</div>
				<button
					class="mt-[32px] box-border flex h-[85px] animate-bounce items-center justify-center rounded-full bg-violet-700 p-[5px] pl-[25px] text-4xl font-extrabold text-white shadow-xl transition-all duration-300 hover:translate-x-6"
					on:click={() => {
						goto('/study');
					}}>BẮT ĐẦU NGAY <img class="ml-[50px] w-[70px]" src={arrow} alt="Arrow" /></button
				>
			</div>
		</div>
	</div>
	<div class="relative h-[500px]">
		<div class="relative w-[100%]">
			<div class="relative h-[500px] w-[90%] overflow-hidden">
				<div
					class="absolute left-[-300px] h-[500px] w-[300px] animate-infScroll rounded-xl bg-red-700"
				></div>
				<div
					class="absolute left-[-300px] h-[500px] w-[300px] animate-[scrollRight_45s_linear_infinity] rounded-xl bg-red-700"
				></div>
				<div
					class="absolute left-[-300px] h-[500px] w-[300px] animate-[scrollRight_45s_linear_infinity] rounded-xl bg-red-700"
				></div>
				<div
					class="absolute left-[-300px] h-[500px] w-[300px] animate-[scrollRight_45s_linear_infinity] rounded-xl bg-red-700"
				></div>
				<div
					class="absolute left-[-300px] h-[500px] w-[300px] animate-[scrollRight_45s_linear_infinity] rounded-xl bg-red-700"
				></div>
			</div>
		</div>
	</div>
</section>
