<script lang="ts">
	let priority = '🟢';
	let priorities = ['🔴', '🟡', '🟢'];
	function selectColor(newColor: string) {
		priority = newColor;
	}
</script>

<span class="invisible md:visible">Priority:</span>
{#each priorities as c}
	<span
		class="chip {priority === c ? 'variant-filled-warning' : 'variant-soft'}"
		on:click={() => {
			selectColor(c);
		}}
		on:keypress
	>
		<span>{c}</span>
	</span>
{/each}
