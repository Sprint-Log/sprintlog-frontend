<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let itemTyp = 'Backlog';
	let typSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'typPopup',
		placement: 'top'
	};
</script>

<span>Type:</span>
<span
	class="chip {itemTyp === itemTyp ? 'variant-filled-warning' : 'variant-soft'}"
	use:popup={typSettings}
>
	<span>{itemTyp}</span>
</span>
