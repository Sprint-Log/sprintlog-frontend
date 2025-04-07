<script lang="ts">
  import type { QueryFunctionContext } from '@tanstack/svelte-query';
  import type { User, Project } from '$lib/types/sprintlog';

  import { createQuery } from '@tanstack/svelte-query';
  import { modalStore } from '@skeletonlabs/skeleton';

  import { getProjectAssigneeBySlug } from '$lib/api/sprintlog';
  import { ASSIGNEE_QUERY_KEY } from '$lib/constants';

  import { createEventDispatcher } from 'svelte';

  export let assignee: User | undefined;
  export let project: Project | undefined;
  export let project_slug: string | undefined;

  $: totalAssignee = 0;

  const dispatch = createEventDispatcher();

  $: assignees = createQuery<User[], Error>({
    enabled: project_slug !== undefined,
    queryKey: [ASSIGNEE_QUERY_KEY, project_slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      let paginatedAssignee = await getProjectAssigneeBySlug(slug);
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

  function openModal() {
    modalStore.trigger({
      component: 'AddTeamModal',
      type: 'component',
      meta: { project }
    });
  }
</script>

{#if $assignees.isSuccess}
  {#if $assignees.data.length > 0}
    <select
      class="bg-surface-100-800-token px-1 bg-transparent text-xs font-mono top-0"
      bind:value={assignee}
      on:change={handleAssigneeChange}
    >
      {#each $assignees.data as assigne}
        <option value={assigne}>{assigne.name}</option>
      {/each}
    </select>
  {:else}
    You haven't assigned any team! <button class="underline text-primary-400" on:click={openModal}>Add Team</button>
  {/if}
{/if}
