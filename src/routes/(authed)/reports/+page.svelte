<script lang="ts">
	/** @type {number} */
	let num: number;

	async function roll() {
		const response = await fetch('/reports/roll');
		num = await response.json();
		console.log(num);
	}
</script>

<button class="btn btn-lg" on:click={roll}>Roll the dice</button>

{#if num !== undefined}
	<p>Report Number is : {num}</p>
{/if}
