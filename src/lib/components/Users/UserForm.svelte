<script lang="ts">
  import type { UserCreate } from '$lib/types/sprintlog';

  import { createUser } from '$lib/api/sprintlog';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';

  let user: UserCreate = {
    email: '',
    password: '',
    name: '',
    isSuperuser: true,
    isActive: false,
    isVerified: false
  };

  // default active button
  let clickedAdminBtn = true;
  const active_btn = 'bg-success-500 text-black';
  const unactive_btn = 'bg-surface-500 text-white';

  let confirmPassword: string;

  let pswdMismatch = false;

  const client = useQueryClient();

  const userMutation = createMutation({
    mutationFn:  () => createUser(user), 

    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey:['refetch-user']});
      modalStore.close();
    },
    onError: () => {
      toastStore.trigger({ message: 'Something went wrong', background: 'variant-filled-error' });
    }
  });

  function handleUserType(event: MouseEvent) {
    let value = (event.target as HTMLButtonElement).value;

    //  clicked admin button
    if (value === 'admin') {
      clickedAdminBtn = true;
      user.isSuperuser = true;
    } else {
      clickedAdminBtn = false;
      user.isSuperuser = false;
    }
  }
</script>

<Toast />
<form
  on:submit={(e) => {
    e.preventDefault();

    if (confirmPassword !== user.password) {
      pswdMismatch = true;
      return;
    }
    console.log(user);
    $userMutation.mutate();
  }}
  action="?/create"
  class="modal-form left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2 gap-4">
    <h3>Create User</h3>
  </div>
  <div class="flex justify-end">
    <button
      type="button"
      class="btn-sm w-16 rounded {clickedAdminBtn ? active_btn : unactive_btn}"
      value="admin"
      on:click={handleUserType}>Admin</button
    >
    <button
      type="button"
      class="btn-sm w-16 rounded {clickedAdminBtn ? unactive_btn : active_btn}"
      value="user"
      on:click={handleUserType}>User</button
    >
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Name</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"
      bind:value={user.name}
      required
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Email</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="email"
      bind:value={user.email}
      required
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={user.password}
      required
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Confirm Password</span>
    <input
      class="input variant-form-material col-span-2"
      type="password"
      bind:value={confirmPassword}
      required
    />
  </div>
  {#if pswdMismatch}
    <p class="text-error-400">Password do not match</p>
  {/if}
  <div class="flex justify-between py-2">
    <button class="text-sm">Back</button>
    <button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
  </div>
</form>
