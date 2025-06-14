<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add, Search, Locked, View, Edit, TrashCan } from '@steeze-ui/carbon-icons';

  import {
    type ModalComponent,
    type ModalSettings,
    Toast,
    Modal,
    modalStore,
    toastStore,
    ProgressRadial
  } from '@skeletonlabs/skeleton';

  import type { User } from '$lib/types/sprintlog';

  import { USERS_QUERY_KEY } from '$lib/constants';
  import UserForm from '$lib/components/Users/UserForm.svelte';
  import UserCard from '$lib/components/Users/UserCard.svelte';
  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import BreadcrumbUser from '$lib/components/Users/BreadcrumbUser.svelte';
  import UserPreviewCard from '$lib/components/Users/UserPreviewCard.svelte';
  import ResetPasswordForm from '$lib/components/Users/ResetPasswordForm.svelte';
  import ConfirmPasswordForm from '$lib/components/Users/ConfirmPasswordForm.svelte';

  import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
  import { deleteUser, getUsers } from '$lib/api/sprintlog';
  import { goto } from '$app/navigation';

  // modals
  const userModalRegistry: Record<string, ModalComponent> = {
    updateFormComponent: { ref: UserUpdateForm },
    createFormComponent: { ref: UserForm },
    userPreviewCard: { ref: UserPreviewCard },
    resetPasswordForm: { ref: ResetPasswordForm },
    confirmPasswordForm: {ref: ConfirmPasswordForm}
  };
  const intervalMs = 15000;
  const client = useQueryClient();

  let limit = 500;
  let page = 1;
  let order = 'desc';

  $: breadCrumb = [{ text: 'Home', href: '/' }];
  $: users = createQuery<User[], Error>({
    queryKey: [USERS_QUERY_KEY, page, limit, order],
    queryFn: getUsers,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs
    // keepPreviousData:true
  });

  function openModel(modelName: string, meta: any | null = null) {
    let modelSetting: ModalSettings = {
      type: 'component',
      component: modelName
    };
    if (meta) {
      modelSetting.meta = meta;
    }
    modalStore.trigger(modelSetting);
  }

  async function handleDelUser(userId: string) {
    modalStore.trigger({
      type: 'confirm',
      title: 'Delete User',
      body: 'Are you sure you want to delete this user?',

      response: async (confirmed) => {
        if (confirmed) {
          await deleteUser(userId);
          client.setQueriesData([USERS_QUERY_KEY, userId], (oldData) => {
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


  function handleActivateUser(user: User) {
    user.isActive = true;
    openModel('confirmPasswordForm', { user }); 
  }

  function handleBreadCrumb(event: CustomEvent<{ user: User }>) {
    let user = event.detail.user;
    breadCrumb[1] = { text: user.name ?? '', href: '/users/' + (user.id ?? '') };
  }
</script>

<Toast />
<Modal components={userModalRegistry} />
<div class="w-full">
  <div class="flex">
    <div
      class="basis-1/3 p-4 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25"
    >
      <div class="flex items-center">
        <h2 class="font-semibold">Users</h2>
        <button
          class="btn-icon hover:variant-soft"
          on:click={() => openModel('createFormComponent')}><Icon src={Add} /></button
        >
      </div>

      {#if !$users.data || $users.data.length === 0}
        <div class="flex flex-col items-center justify-center h-screen">
          <button
            class="flex text-2xl btn border border-surface-200 rounded opacity-30"
            on:click={() => openModel('createFormComponent')}
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
                <div
                  class="card bg-surface-100 border shadow w-64 p-3 text-sm z-50"
                  data-popup={`popup-manage-${user.id}`}
                >
                  <button
                    class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
                    on:click|stopPropagation|preventDefault={() =>
                      openModel('updateFormComponent', { user })}
                  >
                    <Icon src={Edit} size="20" class="inline mr-2" /> Edit User
                  </button>
                  {#if user.isActive}
                    <button
                      class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
                      on:click|stopPropagation|preventDefault={() => handleDelUser(user.id)}
                    >
                      <Icon src={TrashCan} size="20" class="inline mr-2" /> Deactivate User
                    </button>
                  {:else}
                    <button
                      class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
                      on:click|stopPropagation|preventDefault={() => handleActivateUser(user)}
                    >
                      <Icon src={TrashCan} size="20" class="inline mr-2" /> Activate User
                    </button>
                  {/if}

                  <button
                    class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
                    on:click|stopPropagation|preventDefault={() =>
                      openModel('resetPasswordForm', { userId: user.id })}
                  >
                    <Icon src={Locked} size="20" class="inline mr-2" /> Reset Password
                  </button>
                  <div class="arrow variant-filled-primary" />
                </div>
                <UserCard on:selected={handleBreadCrumb} {user} {openModel} />
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
    <div class="basis-4/5 mb-8 space-x-4 max-h-screen overflow-y-scroll">
      <!-- active pjs and tasks -->
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
      <slot />
    </div>
  </div>
</div>
