<script lang="ts">
  import type { UserUpdate } from '$lib/types/sprintlog';

  import { updateUser } from '$lib/api/sprintlog';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';
  
  // modalStore.close();

  // default active button
  const active_btn = 'bg-success-500 text-black';
  const unactive_btn = 'bg-surface-500 text-white';

  const user: UserUpdate = $modalStore[0].meta.user;
  const userId = $modalStore[0].meta.user_id;

  let clickedAdminBtn = user.isSuperuser;

  let pswdMismatch = false;
  let confirmPassword: string;
  let newPassword: string;

  const client = useQueryClient();

  const userUpdateMutation = createMutation({
    mutationFn: async () => updateUser(userId, user),

    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: ['refetch-user'] });
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

    if (confirmPassword !== newPassword) {
      pswdMismatch = true;
      return;
    }
    user.password = newPassword;
    $userUpdateMutation.mutate();
  }}
  action="?/create"
  class="left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2 gap-4">
    <h3>Update User</h3>
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
    <span>Address</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"

      required
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Position</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"

      required
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Bank Account</span>
    <select id="countries" class="variant-form-material rounded h-8 text-xs focus:ring-primary-500 focus:border-surface-500">
      <option class="bg-surface-800" selected>Choose Bank Account</option>
      <option class="bg-surface-800" value="US">Kpay</option>
      <option class="bg-surface-800" value="CA">KBZ</option>
      <option class="bg-surface-800" value="FR">AYA</option>
    </select>
    <input
      class="input variant-form-material h-8"
      type="text"

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
    <span>Old Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={user.password}
      required
    />
  </div>

  <div class="grid grid-cols-3 gap-3">
    <span>New Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={newPassword}
    />
  </div>

  <div class="grid grid-cols-3 gap-3">
    <span>Confirm Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={confirmPassword}
    />
  </div>
  {#if pswdMismatch}
    <p class="text-error-400">Password do not match</p>
  {/if}
  <div class="flex justify-between py-2">
    <button class="text-sm">Back</button>
    <button class="btn btn-sm variant-filled-primary" type="submit"> Update </button>
  </div>
</form>
