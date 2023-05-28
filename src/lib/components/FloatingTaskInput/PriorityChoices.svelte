<script lang="ts">
	import { PriorityEnum } from '$lib/types/scrumlog';

	export let priority: PriorityEnum = PriorityEnum.med;

	function setPriority(newPriority: PriorityEnum) {
		priority = newPriority;
	}
</script>

<span class="hidden md:visible">Priority:</span>
{#each Object.values(PriorityEnum) as pri}
	<span
		class="chip {priority === pri ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setPriority(pri);
		}}
		on:keypress
	>
		{pri}
	</span>
{/each}
