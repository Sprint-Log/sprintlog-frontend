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
	let priPopupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'priPopup',
		placement: 'top'
	};
</script>

<span>Priority:</span>
<span class="chip variant-warning" use:popup={priPopupSettings}>
	{priority}
	{priorityLbls[priority]}
</span>
