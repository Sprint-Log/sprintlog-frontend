<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add, Search } from '@steeze-ui/carbon-icons';

  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
  import type { User } from '$lib/types/sprintlog';
  import type { ProjectItems } from '$lib/types/sprintlog';

  import UserForm from '$lib/components/Users/UserForm.svelte';
  import UserCard from '$lib/components/Users/UserCard.svelte';
  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import BreadcrumbUser from '$lib/components/Users/BreadcrumbUser.svelte';
  import UserView from '$lib/components/Users/UserView.svelte';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import { deleteUser, getUsers } from '$lib/api/sprintlog';

  // modals
  const userModalRegistry: Record<string, ModalComponent> = {
    updateFormComponent: { ref: UserUpdateForm },
    createFormComponent: { ref: UserForm }
  };

  let limit = 500;
  let page = 1;
  let order = 'desc';
  const intervalMs = 15000;
  const client = useQueryClient();

  $: users = createQuery<User[], Error>({
    queryKey: ['refetch-user', page, limit, order],
    queryFn: async() => await getUsers(page, limit, order),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs
    // keepPreviousData:true
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

  $: breadCrumb = [{ text: 'Home', href: '/' }];

  function handleBreadCrumb(event: CustomEvent<{ name: string, id:string }>) {
    let name = event.detail.name;
    let id = event.detail.id;
    breadCrumb[1] = { text: name, href: '/users/' + id };
  }
</script>

<Modal components={userModalRegistry} />
<div class="w-full">
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
  <div class="flex">
    <div
      class="basis-1/3 px-1 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25"
    >
      <div class="flex items-center">
        <h3 class="font-semibold">Users</h3>
        <button class="btn-icon hover:variant-soft" on:click={openCreateFormModal}
          ><Icon src={Add} /></button
        >
      </div>
      <div class="grid">
        {#if !$users.data || $users.data.length === 0}
          <div class="flex flex-col items-center justify-center h-screen">
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
              <UserCard on:delete={handleDelUser} on:selected={handleBreadCrumb} {user} />
            {/each}
          {/if}
        {/if}
      </div>
    </div>
    <div class="basis-4/5 mb-8 space-x-4 max-h-screen overflow-y-scroll">
      <!-- active pjs and tasks -->
      <slot />
    </div>
  </div>
</div>
