<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Edit } from '@steeze-ui/carbon-icons';
  import { TrashCan } from '@steeze-ui/carbon-icons';
  import { View } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let user: User;
  export let openModel: CallableFunction;
</script>

<a
  href="/users/{user.id}"
  class="card bg-initial card-hover overflow-hidden mt-2"
  on:click={() => dispatch('selected', { user: user })}
>
  <div class="flex">
    <div
      class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-black"
    >
      {user.name?.charAt(0).toUpperCase()}
    </div>

    <div class="flex-1 flex-col justify-center px-2 py-1">
      <div class="flex">
        <span class="me-1">{user.name}</span>
        <div
          class="rounded-full flex justify-center items-center bg-surface-200 text-surface-800 text-sm px-2 h-4 mt-1"
        >
          {user.isSuperuser ? 'Admin' : 'User'}
        </div>
        <div
          class="rounded-full flex justify-center items-center {user.isActive
            ? 'bg-green-400'
            : 'bg-red-600'} text-surface-800 text-sm px-2 mx-2 h-4 mt-1"
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </div>
        <div class="ml-auto">
          <button
            class="btn-icon hover:variant-soft w-5"
            on:click={() => openModel('userPreviewCard', { user })}><Icon src={View} /></button
          >
          <button
            class="btn-icon hover:variant-soft w-5 mx-2"
            on:click={() => openModel('updateFormComponent', { user })}><Icon src={Edit} /></button
          >
          <button
            class="btn-icon hover:variant-soft w-5"
            on:click={() => dispatch('delete', { id: user.id.toString() })}
            ><Icon src={TrashCan} /></button
          >
        </div>
      </div>
      <div class="">
        <p class="text-sm text-surface-400">Member of Sprintlog</p>
      </div>
    </div>
  </div>
</a>
