<script>
	export let left = 0;
	export let top = 0;

	let moving = false;
	let section;

	function onMouseMove(e) {
		if (moving) {
			left = e.clientX - section.clientWidth / 2;
			top = e.clientY;
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<section
	aria-label="Moving Element"
	style="left: {left}px; top: {top}px;"
	class="draggable"
	on:mousedown={() => (moving = true)}
	bind:this={section}
>
	<slot></slot>
</section>

<svelte:window on:mouseup={() => (moving = false)} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		position: fixed;
	}
</style>
