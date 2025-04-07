<script lang="ts">
  import { updateUserPassword } from '$lib/api/sprintlog';
  import { createMutation } from '@tanstack/svelte-query';
  import { modalStore, toastStore } from '@skeletonlabs/skeleton';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Clipboard, Check } from '@steeze-ui/heroicons';

  const userId: string = $modalStore[0].meta.userId;
  let copied = false;
  let newPassword = '';
  let adminPassword = '';
  let passwordMesg = '';

  async function resetPasswordHandler() {
    if (newPassword.length > 0 && adminPassword.length > 0) {
      passwordMesg = '';
      $resetPasswordMutation.mutate();
    } else {
      passwordMesg = 'Please fill in all fields';
    }
  }

  $: resetPasswordMutation = createMutation({
    mutationFn: () => updateUserPassword(userId, newPassword, adminPassword),
    onSuccess: () => {
      toastStore.trigger({
        message: 'Successfully reset password!',
        background: 'variant-filled-success',
        timeout: 1500
      });
    },
    onError: (error) => {
      let errorMessage = error?.message || 'Something went wrong';
      passwordMesg = errorMessage;
      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copied = true;
  
  }
</script>

<form
  on:submit={resetPasswordHandler}
  method=""
  class="card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-auto max-h-[36rem]"
  autocomplete="off"
>
  <h3 class="text-lg font-bold">Reset Password</h3>

  {#if $resetPasswordMutation.isSuccess}
    <div>
      <label class="font-medium">Password Updated</label>
      <div class="flex items-center gap-2 mt-1">
        <input class="input w-full" type="text" value={newPassword} readonly />
        <button
          type="button"
          class="btn-icon text-gray-500 hover:text-primary-600 transition"
          on:click={() => copyToClipboard(newPassword)}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          <Icon
            src={copied ? Check : Clipboard}
            size="18"
            class={copied ? 'text-primary-600' : ''}
          />
        </button>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-3 gap-3">
      <span>New Password</span>
      <input
        class="input variant-form-material col-span-2 h-8"
        type="password"
        bind:value={newPassword}
        required
      />

      <span>Admin Password</span>
      <input
        class="input variant-form-material col-span-2 h-8"
        type="password"
        bind:value={adminPassword}
        required
      />
    </div>
  {/if}
  {#if passwordMesg.length > 0}
    <p
      class="text-error-400 w-full text-sm px-2 min-h-[1rem] transition-opacity duration-300"
      class:opacity-0={passwordMesg.length === 0}
    >
      {passwordMesg}
    </p>
  {/if}
  {#if !$resetPasswordMutation.isSuccess}
    <div class="p-4 text-center">
      <button class="btn btn-sm variant-filled-primary" type="submit">Change Password</button>
    </div>
  {/if}
</form>
