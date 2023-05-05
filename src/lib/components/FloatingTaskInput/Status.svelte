<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	let statusSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'statPopup',
		placement: 'top'
	};
	let status: string = '🔅';
	let statuses: string[] = ['🔅', '🚧', '✔️', '✅', '🚫'];
	type StatusObject = {
		[key: string]: string;
	};

	let statusLbls: StatusObject = {
		'🔅': 'New',
		'🚧': 'InProgress',
		'✔️': 'CheckedIn',
		'✅': 'Completed',
		'🚫': 'Cancelled'
	};

	function setStatus(newColor: string) {
		status = newColor;
	}
</script>

<span>Status:</span>

<span class="chip" use:popup={statusSettings}>
	{status}{statusLbls[status]}
</span>
