<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	let priority = '🟢';
	type PriorityObject = {
		[key: string]: string;
	};
	let priorityLbls: PriorityObject = {
		'🔴': 'Urgent',
		'🟡': 'Important',
		'🟢': 'Normal'
	};

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let priPopupSettings: PopupSettings;
</script>

<span>Priority:</span>
<span class="chip variant-warning" use:popup={priPopupSettings}>
	{priority}
	{priorityLbls[priority]}
</span>
