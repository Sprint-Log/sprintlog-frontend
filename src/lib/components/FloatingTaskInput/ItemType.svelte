<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let itemTyp = 'Backlog';
	let typSettings: PopupSettings;
</script>

<span>Type:</span>
<span
	class="chip {itemTyp === itemTyp ? 'variant-filled-warning' : 'variant-soft'}"
	use:popup={typSettings}
>
	<span>{itemTyp}</span>
</span>
