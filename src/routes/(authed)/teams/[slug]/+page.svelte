<script lang="ts">
  import type { QueryFunctionContext } from '@tanstack/svelte-query';
  import type { Team, TeamStatistics } from '$lib/types/sprintlog';

  import { createQuery } from '@tanstack/svelte-query';
  import { TEAM_DETAIL_QUERY_KEY, TEAM_QUERY_KEY, TEAM_STATISTICS_QUERY_KEY } from '$lib/constants';
  import { page } from '$app/stores';
  import { getTeamBySlug, getTeamStatistics } from '$lib/api/team';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { SubtractAlt } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { UserFollow } from '@steeze-ui/carbon-icons';

  import { modalStore } from '@skeletonlabs/skeleton';
  import { useQueryClient } from '@tanstack/svelte-query';

  const client = useQueryClient();

  $: currentTeam = createQuery<Team, Error>({
    queryKey: [TEAM_DETAIL_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      return await getTeamBySlug(slug);
    },
    onSuccess: () => {
      client.invalidateQueries([TEAM_QUERY_KEY]);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  $: currentTeamStatistics = createQuery<TeamStatistics, Error>({
    queryKey: [TEAM_STATISTICS_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      return await getTeamStatistics(slug);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  $: memberCount = $currentTeam.data?.members.length;

  function openAddMemberModal() {
    modalStore.trigger({
      type: 'component',
      component: 'teamMemberCard',
      meta: {
        team: $currentTeam.data
      }
    });
  }
</script>

<div class="flex flex-col mt-2 px-4">
  {#if $currentTeam.isLoading}
    <div class="h-full grid place-items-center">
      <ProgressRadial width="w-12" />
    </div>
  {:else if $currentTeam.isSuccess}
    <section class="">
      <div class="flex gap-3 items-center mb-2">
        <div
          class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-16 h-16 m-2 text-surface-800 text-3xl"
        >
          {$currentTeam.data.name?.charAt(0).toUpperCase()}
        </div>
        <div class="text-3xl font-bold">
          {$currentTeam.data.name}
        </div>
      </div>
      <div class="mb-3">
        {#if $currentTeamStatistics.isLoading}
          <ProgressRadial width="w-12" />
        {:else if $currentTeamStatistics.isSuccess}
          {$currentTeamStatistics.data.taskCount} Open Tasks, {$currentTeamStatistics.data.completedTaskCount} Tasks Completed
        {/if}
      </div>
      <div class="mb-3">
        {$currentTeam.data.description}
      </div>
      <div class="mb-3 font-semibold text-2xl">
        Project Members - {memberCount}
      </div>
      <div class="flex flex-wrap gap-4">
        {#each $currentTeam.data.members as member}
          <div class="flex items-center gap-3 p-1 border rounded-md border-gray-300">
            <div class="">
              <div
                class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-surface-800 text-lg"
              >
                {member.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div class="text-sm">
              <div class="mb-1 font-bold">{member.name}</div>
              <div class="text-xs underline">{member.role}</div>
            </div>
            <button class="btn-icon hover:variant-soft w-6">
              <Icon src={SubtractAlt} />
            </button>
          </div>
        {/each}
        <button
          class="flex items-center gap-2 p-1 no-underline"
          on:click={() => openAddMemberModal()}
          style="text-decoration: none !important;"
        >
          <div>
            <div
              class="flex-none rounded-full flex justify-center items-center w-10 h-10 m-2 text-lg border-white border border-dashed p-2 text-white"
            >
              <Icon src={UserFollow} />
            </div>
          </div>
          <div class="text-white">Add Member</div>
        </button>
      </div>
    </section>
  {/if}
</div>
