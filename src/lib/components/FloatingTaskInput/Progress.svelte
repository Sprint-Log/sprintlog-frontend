<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	let prgPopupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'prgPopup',
		placement: 'top'
	};
	let progress = '🟨🟨🟨';
</script>

<span>Progress:</span>
<span class="chip variant-soft" use:popup={prgPopupSettings}>
	<span>{progress}</span>
</span>
