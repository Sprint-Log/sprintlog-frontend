<script lang="ts">
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
  import type { Team, PaginatedResponse } from '$lib/types/sprintlog';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add } from '@steeze-ui/carbon-icons';
  import { Search } from '@steeze-ui/carbon-icons';

  import { Modal, modalStore, ProgressRadial } from '@skeletonlabs/skeleton';

  import { createQuery } from '@tanstack/svelte-query';
  import BreadcrumbUser from '$lib/components/Users/BreadcrumbUser.svelte';
  import { TEAM_QUERY_KEY } from '$lib/constants';
  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import { getTeams } from '$lib/api/team';

  import TeamCard from '$lib/components/Teams/TeamCard.svelte';
  import TeamForm from '$lib/components/Teams/TeamForm.svelte';
  import TeamMember from '$lib/components/Teams/TeamMember.svelte';
  import TeamPreview from '$lib/components/Teams/TeamPreview.svelte';
  import UserPreviewCard from '$lib/components/Users/UserPreviewCard.svelte';

  const userModalRegistry: Record<string, ModalComponent> = {
    teamCreateForm: { ref: TeamForm },
    teamPreviewCard: { ref: TeamPreview },
    teamMemberCard: { ref: TeamMember },
    userPreviewCard: { ref: UserPreviewCard }
  };

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let total = 0;
  let offset = 0;
  $: breadCrumb = [{ text: 'Home', href: '/' }];
  $: teams = createQuery<Team[], Error>({
    queryKey: [TEAM_QUERY_KEY, page, limit, order],
    queryFn: async () => {
      let response = await getTeams(page, limit, order);
      total = response.total;
      offset = response.offset;
      return response.items;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });
  function handleBreadCrumb(event: CustomEvent<{ team: Team }>) {
    let team = event.detail.team;
    breadCrumb[1] = { text: team.name ?? team.slug, href: '/teams/' + (team.slug ?? '') };
  }
  export function openModal(modelName: string, meta: any | null = null) {
    let modelSetting: ModalSettings = {
      type: 'component',
      component: modelName
    };
    if (meta) {
      modelSetting.meta = meta;
    }
    modalStore.trigger(modelSetting);
  }
</script>

<Toast />
<Modal components={userModalRegistry} />
<div
  class="basis-1/3 space-x-4 p-4 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25"
>
  <div class="flex items-center">
    <h2 class="font-semibold">Teams</h2>
    <button class="btn-icon hover:variant-soft" on:click={() => openModal('teamCreateForm')}
      ><Icon src={Add} /></button
    >
  </div>
  <div class="grid gap-3">
    <!-- team card add -->
    {#if $teams.isLoading}
      <div class="h-full grid place-items-center">
        <ProgressRadial width="w-12" />
      </div>
    {:else if $teams.isError}
      error occurred
    {:else if $teams.isSuccess}
      {#each $teams.data as team}
        <TeamCard on:selected={handleBreadCrumb} {team} {openModal} />
      {/each}
    {:else}
      <div class="flex flex-col items-center my-64">
        <button
          class=" flex text-2xl btn border border-surface-200 rounded opacity-30"
          on:click={() => openModal('teamCreateForm')}
        >
          Create Team <div class="w-9"><Icon src={Add} /></div>
        </button>
      </div>
    {/if}
  </div>
</div>
<div class="basis-4/5 mb-8 space-x-4">
  <nav class="px-6 py-2 bg-surface-100-800-token flex justify-between">
    <BreadcrumbUser items={breadCrumb} />
    <form action="" class="">
      <div class="relative">
        <input type="text" class="input block h-7 ps-8" placeholder="Search" required />
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none">
          <div class="w-4 mx-2">
            <Icon src={Search} />
          </div>
        </div>
      </div>
    </form>
  </nav>
  <section class="space-y-4 mt-3">
    <!-- Team view add -->
    <slot />
  </section>
</div>
