<script lang="ts">
	export let itemTyp = 'Backlog';
	let itemTypes = ['Backlog', 'Task'];
	function selectType(selection: string) {
		itemTyp = selection;
	}
</script>

<span class="hidden md:visible">Type:</span>
{#each itemTypes as typ}
	<span
		class="chip {itemTyp === typ ? 'variant-filled-warning' : 'variant-soft'}"
		on:click={() => {
			selectType(typ);
		}}
		on:keypress
	>
		<span>{typ}</span>
	</span>
{/each}
