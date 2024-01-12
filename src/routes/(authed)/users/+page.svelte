<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import type { ModalSettings } from '@skeletonlabs/skeleton';
  import type { ModalComponent } from '@skeletonlabs/skeleton';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Search } from '@steeze-ui/carbon-icons';
  import { Add } from '@steeze-ui/carbon-icons';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import type { ProjectItems } from '$lib/types/sprintlog';
  import BreadcrumbUser from '$lib/components/Users/BreadcrumbUser.svelte';
  import UserCard from '$lib/components/Users/UserCard.svelte';
  import UserForm from '$lib/components/Users/UserForm.svelte';
  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import { deleteUser, getUsers } from '$lib/api/sprintlog';
  
 
  let limit = 500;
  let page = 1;
  let order = 'desc';
  const intervalMs = 1000000;
  const client = useQueryClient();
 
  $: users = createQuery<User[], Error>({
    queryKey: ['refetch-user', page, limit, order],
    queryFn: () => getUsers(page, limit, order),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs
  });
  $: {
    console.log('This is refetch user data');
    console.log($users.data);
  }

  function openCreateFormModal() {
    modalStore.trigger({
      type: 'component',
      component: 'createFormComponent'
    });
  }

  async function handleDelUser(event: CustomEvent<{ id: string }>) {
    let title, body;
    const id = event.detail.id;
    try {
      const response: { status: number } = await deleteUser(id);

      if (response.status === 204) {
        console.log('Response status 204');
        title = 'Successful deletion';
        body = 'User account has been deleted';

        client.invalidateQueries({ queryKey: ['refetch-user'] });
      }
    } catch (error) {
      title = 'Fail';
      body = 'Something went wrong';
      console.error('Error handling user deletion:', error);
    } finally {
      modalStore.trigger({
        type: 'alert',
        title: title,
        body: body
      });
    }
  }
 

  const prjItems: ProjectItems[] = [
    { text: 'Home', href: '/' },
    { text: 'Projects', href: '/projects' },
    
  ];
</script>
<main class="container">
<nav class="px-6 py-2 bg-surface-100-800-token flex justify-between">
  <BreadcrumbUser items={prjItems} />
    <form action="" class="">
      <div class="relative">
        <input type="text" class="input block h-7 ps-8" placeholder="Search" required>
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none">
          <div class="w-4 mx-2">
            <Icon src={Search} />
          </div>
        </div>
      </div>
    </form>
</nav>
<div class="flex">
<div class="basis-1/3 px-1 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25">
  <div class="flex items-center">
    <h3 class="font-semibold">Users</h3>
    <button class="btn-icon hover:variant-soft" on:click={openCreateFormModal}
      ><Icon src={Add} /></button
    >
  </div>
  <div class="grid gap-2">
    {#if !$users.data || $users.data.length === 0}
      <div class="flex flex-col items-center my-64">
        <button
          class="flex text-2xl btn border border-surface-200 rounded opacity-30"
          on:click={openCreateFormModal}
        >
          Create User <div class="w-9"><Icon src={Add} /></div>
        </button>
      </div>
    {:else}
      {#if $users.isLoading}
        Loading...
      {/if}
      {#if $users.error}
        An error has occurred: {$users.error.message}
      {/if}
      {#if $users.isSuccess}
        {#each $users.data as user}
          <UserCard on:delete={handleDelUser} {user} />
        {/each}
      {/if}
    {/if}
  </div>
</div>
<div class="basis-4/5 mb-8 space-x-4 max-h-screen overflow-y-scroll">
  <div class="flex flex-col items-center my-72">
    <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a user</p>
  </div>
  <!-- active pjs and tasks -->
    
</div>
</div>
</main>
