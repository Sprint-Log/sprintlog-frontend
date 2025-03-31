<script lang="ts">
  import { updateUserPassword } from '$lib/api/sprintlog';
  import { createMutation } from '@tanstack/svelte-query';
  import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';

  const userId = $modalStore[0].meta.user_id;
  let passwordForm: HTMLFormElement;

  const userUpdateMutation = createMutation({
    mutationFn: () => updateUserPassword(userId, newPassword, oldPassword),

    onSuccess: () => {
      toastStore.trigger({
        message: 'Password changed successfully',
        background: 'variant-filled-success',
        timeout: 1500
      });
      passwordForm.style.display = 'none';
      setTimeout(() => {
        modalStore.close();
      }, 1500);
    },
    onError: (error: any) => {
      let errorMessage = error.message || 'Something went wrong';

      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let passwordMesg = '';

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (confirmPassword !== newPassword) {
      passwordMesg = "Password doesn't match";
    } else if (oldPassword === newPassword) {
      passwordMesg = "New password can't be same as old password";
    } else {
      passwordMesg = '';
      $userUpdateMutation.mutate();
    }
  }
</script>

<Toast />
<form
  on:submit={handleSubmit}
  method=""
  class="card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-auto max-h-[36rem]"
  autocomplete="off"
  bind:this={passwordForm}
>
  <h3 class="text-lg font-bold">Change Password</h3>

  <!-- Basic Info -->
  <div class="grid grid-cols-3 gap-3">
    <span>New Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={newPassword}
      required
    />

    <span>Confirm Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={confirmPassword}
      required
    />

    <span>Old Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={oldPassword}
    />
  </div>
  {#if passwordMesg.length > 0}
    <p
      class="text-error-400 w-full text-sm px-2 min-h-[1rem] transition-opacity duration-300"
      class:opacity-0={passwordMesg.length === 0}
    >
      {passwordMesg}
    </p>
  {/if}

  <div class="p-4 text-center">
    <button class="btn btn-sm variant-filled-primary" type="submit">Change Password</button>
  </div>
</form>
