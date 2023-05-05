<script lang="ts">
	let priority = '🟢';
	let priorities = ['🔴', '🟡', '🟢'];
	type PriorityObject = {
		[key: string]: string;
	};
	let priorityLbls: PriorityObject = {
		'🔴': 'Urgent',
		'🟡': 'Important',
		'🟢': 'Normal'
	};
	function selectColor(newColor: string) {
		priority = newColor;
	}
</script>

<span class="hidden md:visible">Priority:</span>
{#each priorities as c}
	<span
		class="chip {priority === c ? 'variant-filled-warning' : 'variant-soft'}"
		on:click={() => {
			selectColor(c);
		}}
		on:keypress
	>
		{c}
		{priorityLbls[c]}
	</span>
{/each}
