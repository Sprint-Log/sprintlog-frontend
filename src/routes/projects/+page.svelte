<script lang="ts">
	export let itemTyp = 'Backlog';
	let itemTypes = ['Backlog', 'Task'];
	function selectType(selection: string) {
		itemTyp = selection;
	}
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	let editTyp = 'Edit';
	let editSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'optionalPopup',
		placement: 'bottom'
	};
</script>

<span class="chip {'variant-ghost-warning'}" use:popup={editSettings}>
	<span>{editTyp}</span>
</span>

<div class="card variant-glass-primary p-4" data-popup="optionalPopup">
	<!-- Append the arrow element -->
	<!-- Append the arrow element -->
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
	<div class="arrow variant-filled-secondary" />
</div>
