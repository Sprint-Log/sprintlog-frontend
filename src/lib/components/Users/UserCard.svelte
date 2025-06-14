<script lang="ts">
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import type { User } from '$lib/types/sprintlog';

  import { EllipsisHorizontal } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Edit } from '@steeze-ui/carbon-icons';
  import { TrashCan } from '@steeze-ui/carbon-icons';
  import { View } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getUserProfileFile } from '$lib/api/sprintlog';
  import { popup } from '@skeletonlabs/skeleton';

  export let user: User;
  export let openModel: (modelName: string, meta: any | null) => void;

  const dispatch = createEventDispatcher();
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
  const popupClick: PopupSettings = {
    event: 'click',
    target: `popup-manage-${user.id}`,
    placement: 'bottom'
  };
</script>

<a
  href="/users/{user.id}"
  class="card bg-initial card-hover overflow-hidden mt-2"
  on:click={() => dispatch('selected', { user: user })}
>
  <div class="flex">
    {#if profileImageUrl}
      <img
        src={profileImageUrl}
        alt="User Profile"
        class="w-10 h-10 m-2 rounded-full object-cover"
      />
    {:else}
      <div
        class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-black"
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>
    {/if}
    <div class="flex-1 flex-col justify-between px-2 py-1">
      <div class="flex justify-between items-start">
        <!-- Left content: user name, role, active status -->
        <div class="flex flex-wrap items-start gap-2">
          <span>{user.name}</span>
          <div
            class="rounded-full flex justify-center items-center bg-surface-200 text-surface-800 text-xs px-2 h-5"
          >
            {user.isSuperuser ? 'Admin' : 'User'}
          </div>
          <div
            class="rounded-full flex justify-center items-center text-surface-800 text-xs px-2 h-5 {user.isActive
              ? 'bg-green-400'
              : 'bg-red-600'}"
          >
            {user.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        <div class="flex justify-between">
          <button
            class="btn-icon group"
            on:click|stopPropagation|preventDefault={() => openModel('userPreviewCard', { user })}
          >
            <Icon
              src={View}
              size="20"
              class="inline mr-2 text-gray-500 group-hover:text-primary-600"
            />
          </button>

          <button
            class="btn-icon hover:variant-soft"
            use:popup={popupClick}
            on:click|preventDefault|stopPropagation
          >
            <Icon src={EllipsisHorizontal} />
          </button>
        </div>
      </div>

      <div>
        <p class="text-sm text-surface-400">Member of Sprintlog</p>
      </div>
    </div>
  </div>
</a>
