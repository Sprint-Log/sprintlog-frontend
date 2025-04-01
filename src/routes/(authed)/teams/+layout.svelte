<script lang="ts">
  import type { Team, PaginatedResponse } from '$lib/types/sprintlog';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add } from '@steeze-ui/carbon-icons';
  import { Search } from '@steeze-ui/carbon-icons';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';

  import { createQuery } from '@tanstack/svelte-query';
  import { useQueryClient } from '@tanstack/svelte-query';

  import { TEAM_QUERY_KEY } from '$lib/constants';
  import { toastStore } from '@skeletonlabs/skeleton';
  import { getTeams } from '$lib/api/team';
  import TeamForm from '$lib/components/Teams/TeamForm.svelte';
  import TeamCard from '$lib/components/Teams/TeamCard.svelte';

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let total = 0;
  let offset = 0;
  const client = useQueryClient();

  $: teams = createQuery<Team[], Error>({
    queryKey: [TEAM_QUERY_KEY, page, limit, order],
    queryFn: async () => {
      let response = await getTeams(page, limit, order);
      console.log('items');
      console.log(response.items);
      total = response.total;
      offset = response.offset;
      return response.items;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  function openModal() {
    modalStore.trigger({
      type: 'component',
      component: 'form'
    });
  }
</script>

<Modal components={{ form: { ref: TeamForm } }} />
<div
  class="basis-1/3 space-x-4 p-4 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25"
>
  <div class="flex items-center">
    <h2 class="font-semibold">Teams</h2>
    <button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
  </div>
  <div class="grid gap-3">
    <!-- team card add -->
    {#if $teams.isLoading}
      ...loading
    {:else if $teams.isError}
      error occurred
    {:else if $teams.isSuccess}
      {#each $teams.data as team}
        <TeamCard {team} />
      {/each}
    {:else}
      <div class="flex flex-col items-center my-64">
        <button
          class=" flex text-2xl btn border border-surface-200 rounded opacity-30"
          on:click={openModal}
        >
          Create Team <div class="w-9"><Icon src={Add} /></div>
        </button>
      </div>
    {/if}
  </div>
</div>
<div class="basis-4/5 mb-8 space-x-4">
  <nav class="flex justify-between bg-surface-800 px-6 py-2">
    <div class=""><button class="hover:underline">Home</button></div>
    <div class="">
      <form action="" class="flex w-56 border border-surface-200 items-center rounded">
        <div class="w-4 mx-2">
          <Icon src={Search} />
        </div>
        <label for="" class="text-sm">Search</label>
      </form>
    </div>
  </nav>
  <section class="space-y-4 mt-3">
    <!-- Team view add -->
  </section>
  <slot />
</div>
