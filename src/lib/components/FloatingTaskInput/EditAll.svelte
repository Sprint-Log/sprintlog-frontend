<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let editTyp = 'Edit';
	let editSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'optionalPopup',
		placement: 'top'
	};
</script>

<span class="chip {'variant-ghost-warning'}" use:popup={editSettings}>
	<span>{editTyp}</span>
</span>
