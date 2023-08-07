<script lang="ts">
	export let sprint: Number = 1;

	function setSprint(sprintNo: Number) {
		sprint = sprintNo;
	}
</script>

<span class="hidden md:visible">Status:</span>
{#each Object.values([1, 2, 3, 4, 5, 6, 7, 8, 9]) as sprintNo}
	<span
		class="chip {sprintNo === sprint ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setSprint(sprintNo);
		}}
		on:keypress={() => {
			setSprint(sprintNo);
		}}
	>
		<span>{sprintNo}</span>
	</span>
{/each}
