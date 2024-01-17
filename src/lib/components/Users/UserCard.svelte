<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Edit } from '@steeze-ui/carbon-icons';
  import { TrashCan } from '@steeze-ui/carbon-icons';
  import { View } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';
  import { modalStore } from '@skeletonlabs/skeleton';
  import type { ModalSettings } from '@skeletonlabs/skeleton';
  import type { ModalComponent } from '@skeletonlabs/skeleton';
  import { Modal} from '@skeletonlabs/skeleton';
  const dispatch = createEventDispatcher();
  export let user: User;
  function handleDelUser() {
    dispatch('delete', {
      id: user.id.toString()
    });
  }

  function openUpdateModal() {
    let modal: ModalSettings = {
      type: 'component',
      component: 'updateFormComponent',
      meta: { user, user_id: user.id }
    };
    modalStore.trigger(modal);
  }
</script>

<!-- <Modal components={{ userUpdateForm: { ref: UserUpdateForm } }} /> -->
<a
  href="/users/{user.id}"
  class="card bg-initial card-hover overflow-hidden mt-2"
  on:click={() => dispatch('selected', { name: user.name, id:user.id })}
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
        <div class="ml-auto">
          <button class="btn-icon hover:variant-soft w-5 " 
            ><Icon src={View} /></button
          >
          <button class="btn-icon hover:variant-soft w-5 mx-2" on:click={openUpdateModal}
            ><Icon src={Edit} /></button
          >
          <button class="btn-icon hover:variant-soft w-5" on:click={handleDelUser}
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
