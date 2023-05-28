<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { User } from '$lib/types/scrumlog';
	import { getUsers } from '$lib/api/scrumlog';
	export let assignee_id: string;
	$: assignees = createQuery<User[], Error>({
		queryKey: ['refetch-assignee'],
		queryFn: async () => await getUsers(1, 20, 'desc'),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true
	});
</script>

<select class="select" bind:value={assignee_id}>
	{#if $assignees.isSuccess}
		{#each $assignees.data as assigne}
			<option value={assigne.id}>{assigne.name}</option>
		{/each}
	{/if}
</select>
