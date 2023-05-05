<script lang="ts">
	let status: string = '🔅';
	let statuses: string[] = ['🔅', '🚧', '✔️', '✅', '🚫'];
	type StatusObject = {
		[key: string]: string;
	};
	let statusLbls: StatusObject = {
		'🔅': 'New',
		'🚧': 'InProgress',
		'✔️': 'CheckedIn',
		'✅': 'Completed',
		'🚫': 'Cancelled'
	};

	function setStatus(newColor: string) {
		status = newColor;
	}
</script>

<span class="hidden md:visible">Status:</span>
{#each statuses as stat}
	<span
		class="chip {status === stat ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setStatus(stat);
		}}
		on:keypress
	>
		{#if status === stat}<span>{statusLbls[stat]}</span>{/if}

		<span>{stat}</span>
	</span>
{/each}
