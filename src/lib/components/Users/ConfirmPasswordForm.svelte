<script lang="ts">
  import { updateUser } from '$lib/api/sprintlog';
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { modalStore, toastStore } from '@skeletonlabs/skeleton';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Clipboard, Check } from '@steeze-ui/heroicons';
  import type { UserUpdate } from '$lib/types/sprintlog';
  import { USERS_QUERY_KEY } from '$lib/constants';

  const user: UserUpdate = $modalStore[0].meta.user;
 
  let adminPassword = '';
  let passwordMesg = '';
  const client = useQueryClient();
  const userUpdateMutation = createMutation({
    mutationFn: async (user: UserUpdate) =>  {
        console.log("Enter udpate")
        user.password = adminPassword;
        return await updateUser(user.id, user);
      },

    onSuccess: (data) => {
      client.setQueriesData([USERS_QUERY_KEY, user.id], data);
      client.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toastStore.trigger({
        message: 'Successfully update!',
        background: 'variant-filled-success',
        timeout: 1500
      });
      modalStore.close();
    },
    onError: (error: any) => {
      let errorMessage = error.message || 'Something went wrong';
      modalStore.close();

      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });
</script>

<form
  on:submit|preventDefault={$userUpdateMutation.mutate(user)}
  method=""
  class="card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-auto max-h-[36rem]"
  autocomplete="off"
>
  <h3 class="text-lg font-bold">Reset Password</h3>

  <div class="grid grid-cols-3 gap-3">
    <span>Enter Admin Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={adminPassword}
      required
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
  {#if !$userUpdateMutation.isSuccess}
    <div class="p-4 text-center">
      <button class="btn btn-sm variant-filled-primary" type="submit">Confirm</button>
    </div>
  {/if}
</form>
