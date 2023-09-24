<script lang="ts">
	import { TagEnum } from '$lib/types/sprintlog';

	export let selTag: TagEnum = TagEnum.ideas;
	let visible: boolean = false;

	function setTag(newTag: TagEnum) {
		selTag = newTag;
	}
	function setVisible() {
		visible = !visible;
	}
</script>

{#each Object.values(TagEnum) as tag}
	<div
		class="chip {selTag === tag ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setTag(tag);
		}}
		on:keypress
	>
		{tag}
	</div>
{/each}
