<script lang="ts">
	import ItemTypeChoices from '$lib/components/FloatingTaskInput/ItemTypeChoices.svelte';
	import ProgressChoices from '$lib/components/FloatingTaskInput/ProgressChoices.svelte';
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
	let progressSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'progressPopup',
		placement: 'bottom'
	};
</script>

<span class="chip {'variant-ghost-warning'}" use:popup={editSettings}>
	<span>{editTyp}</span>
</span>
<span class="chip {'variant-ghost-warning'}" use:popup={progressSettings}>
	<span>{'progress'}</span>
</span>

<div class="card variant-glass-primary p-4" data-popup="optionalPopup">
	<!-- Append the arrow element -->
	<!-- Append the arrow element -->
	<ItemTypeChoices />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="progressPopup">
	<!-- Append the arrow element -->
	<!-- Append the arrow element -->
	<ProgressChoices />
	<div class="arrow variant-filled-secondary" />
</div>
