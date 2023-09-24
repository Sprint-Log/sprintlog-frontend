<script lang="ts">
	import { ProgressEnum } from '$lib/types/sprintlog';

	export let progress: ProgressEnum = ProgressEnum.empty;

	function setProgress(newProgress: ProgressEnum) {
		progress = newProgress;
	}
</script>

<span class="hidden md:visible">Progress:</span>
{#each Object.values(ProgressEnum) as prog}
	<div
		class="chip {progress === prog ? 'variant-filled-surface' : 'variant-soft'}"
		on:click={() => {
			setProgress(prog);
		}}
		on:keypress
	>
		{prog}
	</div>
{/each}
