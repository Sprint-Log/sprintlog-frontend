<script lang="ts">
	let item = 'Backlog';
	let itemTypes = ['Backlog', 'Task'];
	function selectType(selection: string) {
		item = selection;
	}
</script>

<span class="invisible md:visible">Type:</span>
{#each itemTypes as typ}
	<span
		class="chip {item === typ ? 'variant-filled-warning' : 'variant-soft'}"
		on:click={() => {
			selectType(typ);
		}}
		on:keypress
	>
		<span>{typ}</span>
	</span>
{/each}
