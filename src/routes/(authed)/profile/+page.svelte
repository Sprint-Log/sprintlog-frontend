<script lang="ts">
  import type { User, UserProfileUpdate } from '$lib/types/sprintlog';
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { Edit, Locked } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Modal, modalStore, toastStore } from '@skeletonlabs/skeleton';
  
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { TEAM_DETAIL_QUERY_KEY, TEAM_QUERY_KEY, USER_DETAIL_QUERY_KEY } from '$lib/constants';
  import { uploadProfile, getUserProfileFile } from '$lib/api/sprintlog';

  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import ChangePasswordForm from '$lib/components/Users/ChangePasswordForm.svelte';
  
  export let data;
  const client = useQueryClient();
  const user: User = data.user;

  let fileInput: HTMLInputElement;
  let profileImageUrl: string | null = null;

  onMount(async () => {
    if (user.avatarUrl) {
      try {
        const fileBlob = await getUserProfileFile(user.id);
        profileImageUrl = URL.createObjectURL(fileBlob);
      } catch (err) {
        console.error('Failed to load profile image:', err);
      }
    }
  });

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target?.files && target.files.length > 0) {
      const file = target.files[0];
      profileImageUrl = URL.createObjectURL(file);
      $uploadFileMutation.mutate(file);
    }
  }

  const userModalRegistry: Record<string, ModalComponent> = {
    updateFormComponent: { ref: UserUpdateForm },
    changePasswordComponent: { ref: ChangePasswordForm }
  };

  function openModal(modelName: string) {
    let modal: ModalSettings = {
      type: 'component',
      component: modelName,
      meta: { user, user_id: user.id }
    };
    modalStore.trigger(modal);
  }

  const uploadFileMutation = createMutation({
    mutationFn: (profileFile: File) => uploadProfile(user.id, profileFile),
    onSuccess: function (data) {
      client.setQueriesData([USER_DETAIL_QUERY_KEY], data);
      client.invalidateQueries([TEAM_QUERY_KEY]);
      client.invalidateQueries([TEAM_DETAIL_QUERY_KEY]);
      toastStore.trigger({
        message: 'Profile image updated!',
        background: 'variant-filled-success'
      });
    },
    onError: function (err: Error) {
      toastStore.trigger({
        message: err.message || 'Upload failed',
        background: 'variant-filled-error'
      });
    }
  });
</script>

<Modal components={userModalRegistry} />
<section class="p-6 lg:p-8 flex-grow overflow-y-auto max-h-screen">
  <div class="flex items-center gap-3 mb-6">
    <h2 class="text-xl font-semibold">Profile</h2>
    <button class="btn-icon hover:variant-soft" on:click={() => openModal('updateFormComponent')}>
      <Icon src={Edit} size="30" />
    </button>
  </div>

  <!-- Profile Image -->
  <div class="relative w-24 h-24 mb-4">
    <button
      class="w-full h-full rounded-full bg-surface-300 text-center flex justify-center items-center text-3xl font-bold text-surface-800 cursor-pointer hover:ring-2 hover:ring-primary-500 hover:opacity-80 overflow-hidden"
      on:click={() => fileInput.click()}
    >
      {#if profileImageUrl}
        <img src={profileImageUrl} alt="Profile" class="w-full h-full object-cover" />
      {:else}
        {user.name?.charAt(0).toUpperCase()}
      {/if}
    </button>

    <input
      type="file"
      accept="image/*"
      class="hidden"
      bind:this={fileInput}
      on:change={handleFileChange}
    />

    <div
      class="absolute bottom-0 left-0 w-full text-center text-xs text-gray-500 opacity-0 hover:opacity-100 transition-opacity"
    >
      Upload Profile
    </div>
  </div>

  <div class="flex flex-col gap-4 text-current">
    <div class="flex items-center gap-3">
      <p>Name: {user.name}</p>
      <span class="rounded-full text-black bg-surface-200 text-xs px-2 h-5 flex items-center">
        {user.isSuperuser ? 'Admin' : 'User'}
      </span>
      <span
        class="rounded-full text-xs px-2 h-5 flex items-center text-white"
        class:bg-green-500={user.isActive}
        class:bg-red-500={!user.isActive}
      >
        {user.isActive ? 'Active' : 'Inactive'}
      </span>
    </div>

    <p>Position: {user.position}</p>
    <p>Address: {user.address}</p>

    <div>
      <p class="mb-1">Bank Accounts</p>
      {#if user.bankAccounts && user.bankAccounts.length > 0}
        <div class="flex flex-wrap gap-4">
          {#each user.bankAccounts as acc}
            <div class="border rounded p-3 w-[280px]">
              <p class="font-semibold">Method: <span>{acc.method.toUpperCase()}</span></p>
              <p class="text-sm text-gray-600">Account: {acc.accountNumber}</p>
            </div>
          {/each}
        </div>
      {:else}
        <p class="italic text-gray-400">No bank accounts added.</p>
      {/if}
    </div>

    <p>Email: {user.email}</p>
  </div>

  <button
    class="mt-6 inline-flex items-center gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-semibold transition-colors shadow-md"
    on:click={() => openModal('changePasswordComponent')}
  >
    <Icon src={Locked} size="18" />
    Change Password
  </button>
</section>
