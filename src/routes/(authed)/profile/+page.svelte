<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';

  import { Edit, Locked } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';

  import { Modal, modalStore } from '@skeletonlabs/skeleton';

  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import ChangePasswordForm from '$lib/components/Users/ChangePasswordForm.svelte';

  export let data;
  const user: User = data.user;

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
</script>

<Modal components={userModalRegistry} />
<section class="p-6 lg:p-8 flex-grow overflow-y-auto max-h-screen">
  <div class="flex items-center gap-3 mb-6">
    <h2 class="text-xl font-semibold">Profile</h2>
    <button class="btn-icon hover:variant-soft" on:click={() => openModal('updateFormComponent')}>
      <Icon src={Edit} size=30 />
    </button>
  </div>

  <div class="flex flex-col gap-4 text-current">
    <!-- Name, Role, Status -->
    <div class="flex items-center gap-3">
      <p>Name: {user.name}</p>
      <span class="rounded-full text-black bg-surface-200 text-xs px-2 h-5 flex items-center">
        {user.isSuperuser ? 'Admin' : 'User'}
      </span>
      <span
        class="rounded-full text-black text-xs px-2 h-5 flex items-center text-white"
        class:bg-green-500={user.isActive}
        class:bg-red-500={!user.isActive}
      >
        {user.isActive ? 'Active' : 'Inactive'}
      </span>
    </div>

    <p>Position: {user.position}</p>
    <p>Address: {user.address}</p>

    <!-- Bank Accounts -->
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
