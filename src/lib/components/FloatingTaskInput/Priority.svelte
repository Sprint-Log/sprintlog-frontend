<script lang="ts">
	import { PriorityEnum } from '$lib/types/scrumlog';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let priority: PriorityEnum = PriorityEnum.med;
	export let priPopupSettings: PopupSettings;

	function setPriority(newPriority: PriorityEnum) {
		priority = newPriority;
	}
</script>

<span>Priority:</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class="chip variant-warning"
	use:popup={priPopupSettings}
	on:click={() => setPriority(priority)}
>
	{priority}
</span>
