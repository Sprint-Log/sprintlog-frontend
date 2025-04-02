<script lang="ts">
  import type { QueryFunctionContext } from '@tanstack/svelte-query';
  import type { Team, TeamStatistics, TeamMember } from '$lib/types/sprintlog';

  import { createQuery } from '@tanstack/svelte-query';
  import { TEAM_DETAIL_QUERY_KEY, TEAM_QUERY_KEY, TEAM_STATISTICS_QUERY_KEY } from '$lib/constants';

  import { getProfileFile } from '$lib/api/sprintlog.js';
  import { getTeamBySlug, getTeamStatistics, removeMember } from '$lib/api/team';

  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { SubtractAlt } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { page } from '$app/stores';
  import { UserFollow } from '@steeze-ui/carbon-icons';

  import { modalStore } from '@skeletonlabs/skeleton';
  import { useQueryClient } from '@tanstack/svelte-query';

  export let data;

  const client = useQueryClient();
  let currentUser = data.user;
  let memberImages: Record<string, string | null> = {};

  $: currentTeam = createQuery<Team, Error>({
    queryKey: [TEAM_DETAIL_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      let team = await getTeamBySlug(slug);
      await loadMemberImages(team.members);
      return team;
    },
    onSuccess: () => {
      client.invalidateQueries([TEAM_QUERY_KEY]);
    },
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });
  $: teamID = $currentTeam.data?.id ?? '';
  $: currentTeamStatistics = createQuery<TeamStatistics, Error>({
    queryKey: [TEAM_STATISTICS_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      return await getTeamStatistics(slug);
    },
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  $: memberCount = $currentTeam.data?.members.length;

  async function loadMemberImages(members: TeamMember[]) {
    for (const member of members) {
      if (member.avatarUrl) {
        try {
          const blob = await getProfileFile();
          memberImages[member.userId] = URL.createObjectURL(blob);
        } catch (err) {
          console.error('Failed to load profile for', member.userId, err);
          memberImages[member.userId] = null;
        }
      }
    }
  }

  function openAddMemberModal() {
    modalStore.trigger({
      type: 'component',
      component: 'teamMemberCard',
      meta: {
        team: $currentTeam.data
      }
    });
  }
  function isTeamAdmin() {
    if (
      $currentTeam.data?.members.some(
        (member) =>
          member.userId == currentUser.id && (member.role == 'ADMIN' || member.isOwner == true)
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function handleDelMember(username: string) {
    modalStore.trigger({
      type: 'confirm',
      title: 'Remove Member',
      body: 'Are you sure you want to remove this member?',

      response: async (confirmed) => {
        if (confirmed) {
          await removeMember(teamID, username);
          client.setQueriesData([TEAM_DETAIL_QUERY_KEY, teamID], (oldData) => {
            if (oldData) {
              return { ...oldData, isActive: false };
            }
            return oldData;
          });
          client.invalidateQueries({ queryKey: [TEAM_DETAIL_QUERY_KEY, $page.params.slug] });
        }
      }
    });
  }
</script>

<div class="flex flex-col mt-2 px-4">
  {#if $currentTeam.isLoading}
    <div class="h-screen place-items-center">
      <ProgressRadial fill="white" width="w-12" />
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
          {$currentTeamStatistics.data.taskCount} Open Tasks, {$currentTeamStatistics.data
            .completedTaskCount} Tasks Completed
        {/if}
      </div>
      <div class="mb-3">
        {$currentTeam.data.description || ''}
      </div>
      <div class="mb-3 font-semibold text-2xl">
        Project Members - {memberCount}
      </div>
      <div class="flex flex-wrap gap-4">
        {#each $currentTeam.data.members as member}
          <div class="flex items-center gap-3 p-1 border rounded-md border-gray-300">
            <div
              class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-surface-800 text-lg"
            >
              {#if memberImages[member.userId]}
                <img
                  src={memberImages[member.userId]}
                  alt="User Profile"
                  class="w-full h-full rounded-full object-cover"
                />
              {:else}
                {member.name?.charAt(0).toUpperCase()}
              {/if}
            </div>
            <div class="text-sm">
              <div class="mb-1 font-bold">{member.name}</div>
              <div class="text-xs underline">{member.role}</div>
            </div>
            {#if isTeamAdmin()}
              <button
                class="btn-icon hover:variant-soft w-6"
                on:click={() => handleDelMember(member.email ?? '')}
              >
                <Icon src={SubtractAlt} />
              </button>
            {/if}
          </div>
        {/each}
        <button
          class="flex items-center gap-2 p-1 no-underline"
          on:click={() => openAddMemberModal()}
          style="text-decoration: none !important;"
        >
          <div>
            <button
              class="flex-none rounded-full flex justify-center items-center w-10 h-10 m-2 text-lg border-white border border-dashed p-2 text-white"
            >
              <Icon src={UserFollow} />
            </button>
          </div>
          <div class="text-white">Add Member</div>
        </button>
      </div>
    </section>
  {/if}
</div>
