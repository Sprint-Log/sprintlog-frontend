<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import type { User } from '$lib/types/sprintlog';
  import { getUsers } from '$lib/api/sprintlog';
  import { createEventDispatcher } from 'svelte';

  export let assignee: User | undefined;
  const dispatch = createEventDispatcher();

  $: assignees = createQuery<User[], Error>({
    queryKey: ['refetch-assignee'],
    queryFn: async () => await getUsers(1, 200, 'desc'),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true
  });

  function handleAssigneeChange(event: Event) {
    const selectedAssignee = assignee
    console.log("assignee handled")
    dispatch('assigneeSelected', selectedAssignee);
  }
</script>

<select class="bg-surface-100-800-token" bind:value={assignee} 
on:change={handleAssigneeChange} >
  {#if $assignees.isSuccess}
    {#each $assignees.data as assigne}
      <option  value={assigne}>{assigne.name}</option>
    {/each}
  {/if}
</select>