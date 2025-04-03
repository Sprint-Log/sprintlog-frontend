<script lang="ts">
  import type { User } from '$lib/types/sprintlog';

  import { createQuery } from '@tanstack/svelte-query';

  import { getProjectAssigneeBySlug } from '$lib/api/sprintlog';
  import { createEventDispatcher } from 'svelte';
  import { ASSIGNEE_QUERY_KEY } from '$lib/constants';
  
  export let assignee: User | undefined;
  export let project_slug;

  $: totalAssignee = 0;

  const dispatch = createEventDispatcher();

  $: assignees = createQuery<User[], Error>({
    enabled: project_slug !== undefined,
    queryKey: [ASSIGNEE_QUERY_KEY],
    queryFn: async () => {
      let paginatedAssignee = await getProjectAssigneeBySlug(project_slug);
      totalAssignee = paginatedAssignee.total;
      return paginatedAssignee.items;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true
  });

  function handleAssigneeChange(event: Event) {
    const selectedAssignee = assignee;
    dispatch('assigneeSelected', selectedAssignee);
  }
</script>

{#if $assignees.isSuccess}
  {#if $assignees.data.length > 0}
    <select
      class="bg-surface-100-800-token px-1 bg-transparent text-xs font-mono top-0"
      bind:value={assignee}
      on:change={handleAssigneeChange}
    />
    {#each $assignees.data as assigne}
      <option value={assigne}>{assigne.name}</option>
    {/each}
  {:else}
    You haven't assigned any team!
  {/if}
{/if}
