<script>
	let color = 'red';
</script>

{#each ['red', 'blue', 'green'] as c}
	<span
		class="chip {color === c ? 'variant-filled' : 'variant-soft'}"
		on:click={() => {
			section(c);
		}}
		on:keypress
	>
		{#if color === c}(<span>(icon)</span>){/if}
		<span>{c}</span>
	</span>
{/each}
