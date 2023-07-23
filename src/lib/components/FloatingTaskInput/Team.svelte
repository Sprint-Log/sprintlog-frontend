<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { User } from '$lib/types/sprintlog';
	import { getUsers } from '$lib/api/sprintlog';
	export let assignee: User;
	$: assignees = createQuery<User[], Error>({
		queryKey: ['refetch-assignee'],
		queryFn: async () => await getUsers(1, 20, 'desc'),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true
	});
</script>

<select class="select" bind:value={assignee}>
	{#if $assignees.isSuccess}
		{#each $assignees.data as assigne}
			<option value={assigne}>{assigne.name}</option>
		{/each}
	{/if}
</select>
