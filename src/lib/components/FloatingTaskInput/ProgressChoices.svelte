<script lang="ts">
	export let progress = '🟨🟨🟨';
	let progresses = ['🟨🟨🟨', '🟩🟨🟨', '🟩🟩🟨', '🟩🟩🟩'];
	function setProgress(newColor: string) {
		progress = newColor;
	}
</script>

<span class="hidden md:visible">Progress:</span>
{#each progresses as p}
	<span
		class="chip {progress === p ? 'variant-filled-surface' : 'variant-soft'}"
		on:click={() => {
			setProgress(p);
		}}
		on:keypress
	>
		<span>{p}</span>
	</span>
{/each}
