<script lang="ts">
 
	import { createQuery } from '@tanstack/svelte-query';
	import type { User } from '$lib/types/sprintlog';
	import { getUsers } from '$lib/api/sprintlog';
	import { createEventDispatcher } from 'svelte';
	import {ASSIGNEE_QUERY_KEY} from '$lib/constants';
	export let assignee: User | undefined;
	const dispatch = createEventDispatcher();

	const assignees = createQuery<User[], Error>({
		queryKey: [ASSIGNEE_QUERY_KEY],
		queryFn: async () => await getUsers(1, 200, 'desc'),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true
	});

	function handleAssigneeChange(event: Event) {
		const selectedAssignee = assignee;
		dispatch('assigneeSelected', selectedAssignee);
	}
</script>

<select
	class="bg-surface-100-800-token px-1 bg-transparent text-xs font-mono top-0"
	bind:value={assignee}
	on:change={handleAssigneeChange}
>
	{#if $assignees.isSuccess}
		{#each $assignees.data as assigne}
			<option value={assigne}>{assigne.name}</option>
		{/each}
	{/if}
</select>
