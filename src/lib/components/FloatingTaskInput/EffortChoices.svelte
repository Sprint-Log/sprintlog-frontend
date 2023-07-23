<script lang="ts">
	export let estDays: Number = 2;

	function setEffort(effortNo: Number) {
		estDays = effortNo;
	}
</script>

<span class="hidden md:visible">Status:</span>
{#each Object.values([1, 2, 3, 4, 5, 6, 7, 8, 9]) as effort}
	<span
		class="chip {effort === estDays ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setEffort(effort);
		}}
		on:keypress={() => {
			setEffort(effort);
		}}
	>
		<span>{effort}</span>
	</span>
{/each}
