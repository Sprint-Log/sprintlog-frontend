<script lang="ts">
	import { TagEnum } from '$lib/types/scrumlog';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let tagsPopupSettings: PopupSettings;

	let selTag: TagEnum = TagEnum.features;
	let visible: boolean = false;

	function setTag(newTag: TagEnum) {
		selTag = newTag;
	}
</script>

<span>Tags:</span>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="chip" use:popup={tagsPopupSettings} on:click={() => (visible = !visible)}>
	{selTag}
</span>

{#if visible}
	<div class="dropdown">
		{#each Object.values(TagEnum) as tag}
			<span
				class="chip {selTag === tag ? 'variant-filled-success' : 'variant-soft'}"
				on:click={() => {
					setTag(tag);
					visible = false;
				}}
				on:keypress
			>
				{tag}
			</span>
		{/each}
	</div>
{/if}
