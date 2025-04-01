<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add, Search } from '@steeze-ui/carbon-icons';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
  import type { User } from '$lib/types/sprintlog';
  import type { ProjectItems } from '$lib/types/sprintlog';

  import { USERS_QUERY_KEY } from '$lib/constants';
  import UserForm from '$lib/components/Users/UserForm.svelte';
  import UserCard from '$lib/components/Users/UserCard.svelte';
  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import BreadcrumbUser from '$lib/components/Users/BreadcrumbUser.svelte';
  import UserPreviewCard from '$lib/components/Users/UserPreviewCard.svelte';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import { deleteUser, getUsers } from '$lib/api/sprintlog';
  import { goto } from '$app/navigation';

  // modals
  const userModalRegistry: Record<string, ModalComponent> = {
    updateFormComponent: { ref: UserUpdateForm },
    createFormComponent: { ref: UserForm },
    userPreviewCard: { ref: UserPreviewCard }
  };
  $: breadCrumb = [{ text: 'Home', href: '/' }];
  let limit = 500;
  let page = 1;
  let order = 'desc';
  const intervalMs = 15000;
  const client = useQueryClient();

  $: users = createQuery<User[], Error>({
    queryKey: [USERS_QUERY_KEY, page, limit, order],
    queryFn:  () => getUsers(page, limit, order),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs
    // keepPreviousData:true
  });

  function openCreateFormModal() {
    modalStore.trigger({
      type: 'component',
      component: 'createFormComponent'
    });
  }

  async function handleDelUser(event: CustomEvent<{ id: string }>) {

    const id = event.detail.id.toString();
    
    modalStore.trigger({
      type: 'confirm',
      title: 'Delete User',
      body: 'Are you sure you want to delete this user?',

      response: async (confirmed) => {
        if (confirmed) {
          await deleteUser(id);
          client.setQueriesData([USERS_QUERY_KEY, id], (oldData) => {
            if (oldData) {
              return { ...oldData, isActive: false };
            }
            return oldData;
          });
          client.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
          goto('/users');
        }
      }
    });
  }

  function handleBreadCrumb(event: CustomEvent<{ user: User }>) {
    let user = event.detail.user;
    breadCrumb[1] = { text: user.name ?? '', href: '/users/' + (user.id ?? '') };
  }

  function openUserProfile(event: CustomEvent<{ user: User }>) {
    let user = event.detail.user;

    modalStore.trigger({
      type: 'component',
      component: 'userPreviewCard',
      meta: { user }
    });
  }

  function openUpdateModal(event: CustomEvent<{ user: User }>) {
    let user = event.detail.user;
    let modal: ModalSettings = {
      type: 'component',
      component: 'updateFormComponent',
      meta: { user, user_id: user.id }
    };
    modalStore.trigger(modal);
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
          <div class="h-full grid place-items-center">
            <ProgressRadial width="w-12" />
          </div>
        {/if}
        {#if $users.error}
          An error has occurred: {$users.error.message}
        {/if}
        {#if $users.isSuccess}
          <div class=" h-screen overflow-y-scroll scroll-smooth hide-scrollbar">
            {#each $users.data as user}
              <div class="grid px-2">
                <UserCard
                  on:delete={handleDelUser}
                  on:selected={handleBreadCrumb}
                  on:view={openUserProfile}
                  on:update={openUpdateModal}
                  {user}
                />
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
    <div class="basis-4/5 mb-8 space-x-4 max-h-screen overflow-y-scroll">
      <!-- active pjs and tasks -->
      <slot />
    </div>
  </div>
</div>
