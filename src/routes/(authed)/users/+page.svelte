<script lang="ts">
  import type { User } from '$lib/types/sprintlog';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Search } from '@steeze-ui/carbon-icons';
  import { Add } from '@steeze-ui/carbon-icons';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import UserCard  from '$lib/components/Users/UserCard.svelte';
  import UserForm  from '$lib/components/Users/UserForm.svelte';
  import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import { getUsers } from '$lib/api/sprintlog';

  function openModal() {
    modalStore.trigger({
      type: 'component',
      component: 'form'
    });
  }

  let limit = 500;
  let page = 1;
  let order = 'desc';

  let intervalMs = 15000;

  $: users = createQuery<User[], Error>({
    queryKey: ['refetch-user', page, limit, order],
    queryFn: async () => getUsers(page, limit, order),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 0,
    refetchInterval: intervalMs
  });
</script>

<Modal components={{ form: { ref: UserForm } }} />
<div
  class="basis-1/3 mb-8 space-x-4 p-2 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25"
>
  <div class="flex items-center">
    <h3 class="font-semibold">Users</h3>
    <button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
  </div>
  <div class="grid gap-3" />
  <div class="flex flex-col items-center my-64">
    {#if users === null}
      <button
        class=" flex text-2xl btn border border-surface-200 rounded opacity-30"
        on:click={openModal}
      >
        Create User <div class="w-9"><Icon src={Add} /></div>
      </button>
    {:else}
      {#if $users.isLoading}
        Loading...
      {/if}
      {#if $users.error}
        An error has occurred:
        {$users.error.message}
      {/if}
      {#if $users.isSuccess}
        {#each $users.data as user}
          <UserCard {user} />
        {/each}
      {/if}
    {/if}
  </div>
</div>
<div class="basis-4/5 mb-8 space-x-4">
  <nav class="flex justify-between bg-surface-800 px-6 py-2">
    <div class=""><button class="hover:underline">Home</button></div>
    <div class="">
      <form action="" class="">
        <div class="flex w-56 border border-surface-200 rounded">
          <div class="w-4 mx-2">
            <Icon src={Search} />
          </div>
          <label for="" class="text-sm">Search</label>
        </div>
      </form>
    </div>
  </nav>

  <div class="flex flex-col items-center my-72">
    <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a user</p>
  </div>
</div>
