<script lang="ts">
	import { StatusEnum } from '$lib/types/scrumlog';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let status: StatusEnum = StatusEnum.new;
	export let statusSettings: PopupSettings;

	function setStatus(newStatus: StatusEnum) {
		status = newStatus;
	}
</script>

<span>Status:</span>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="chip" use:popup={statusSettings} on:click={() => setStatus(status)}>
	{status}
</span>
