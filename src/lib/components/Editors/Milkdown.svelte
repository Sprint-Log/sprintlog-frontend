<script lang="ts">
	// import { onMount } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';
	// import { emoji } from '@milkdown/plugin-emoji';

	export let defaultValue: any;

	function editor(dom: HTMLElement) {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, defaultValue);
			})
			// .use(nord)
			// .use(emoji)
			.config(nord)
			.use(commonmark)
			.create();
	}
</script>

<div use:editor />

<style>
</style>
