<script lang="ts">
	export let itemTyp = 'backlog';
	let itemTypes = ['backlog', 'task'];
	function selectType(selection: string) {
		itemTyp = selection;
	}
</script>

{#each itemTypes as typ}
	<span
		class="chip  {itemTyp === typ ? 'variant-filled-warning' : 'variant-soft'}"
		on:click={() => {
			selectType(typ);
		}}
		on:keypress
	>
		<span>{typ}</span>
	</span>
{/each}
