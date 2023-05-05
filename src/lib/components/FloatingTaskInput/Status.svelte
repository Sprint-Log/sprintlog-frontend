<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let statusSettings: PopupSettings;
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
