<script lang="ts">
  import type { UserUpdate } from '$lib/types/sprintlog';

  import { USERS_QUERY_KEY } from '$lib/constants';
  import { updateUser } from '$lib/api/sprintlog';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { modalStore, toastStore } from '@skeletonlabs/skeleton';
  import { PaymentMethodEnum } from '$lib/types/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { XMark } from '@steeze-ui/heroicons';
  import { page } from '$app/stores';

  const client = useQueryClient();
  const user: UserUpdate = $modalStore[0].meta.user;

  const active_btn = 'bg-success-500 text-black';
  const unactive_btn = 'bg-surface-500 text-white';

  const userUpdateMutation = createMutation({
    mutationFn: async () => updateUser(user.id, user),

    onSuccess: (data) => {
      client.setQueriesData([USERS_QUERY_KEY, data.id], data);
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

  let toggleAdminBtn = user.isSuperuser;
  let bankAccounts: { method: string; accountNumber: string }[] = user.bankAccounts ?? [];

  function ToggleUserType(event: MouseEvent) {
    let value = (event.target as HTMLButtonElement).value;
    toggleAdminBtn = value === 'admin';
    user.isSuperuser = toggleAdminBtn;
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    $userUpdateMutation.mutate();
  }

  function addBankAccount() {
    bankAccounts = [...bankAccounts, { method: PaymentMethodEnum.K_PAY, accountNumber: '' }];
    user.bankAccounts = bankAccounts;
  }

  function removeBankAccount(index: number) {
    bankAccounts = bankAccounts.filter((_, i) => i !== index);
    user.bankAccounts = bankAccounts;
  }
</script>

<form
  on:submit={handleSubmit}
  class="card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-auto max-h-[36rem]"
>
  <h3 class="text-lg font-bold">Update User</h3>
  {#if $page.data.user?.isSuperuser}
    <div class="flex justify-end">
      <button
        type="button"
        class="btn-sm w-16 rounded {toggleAdminBtn ? active_btn : unactive_btn}"
        value="admin"
        on:click={ToggleUserType}>Admin</button
      >
      <button
        type="button"
        class="btn-sm w-16 rounded {toggleAdminBtn ? unactive_btn : active_btn}"
        value="user"
        on:click={ToggleUserType}>User</button
      >
    </div>
  {/if}
  <!-- Basic Info -->
  <div class="grid grid-cols-3 gap-3">
    <span>Name</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"
      bind:value={user.name}
      required
    />

    <span>Position</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"
      bind:value={user.position}
      required
    />

    <span>Address</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"
      bind:value={user.address}
    />
  </div>

  <!-- Bank Accounts -->
  <div class="grid grid-cols-1 gap-4">
    <div class="flex justify-between items-center">
      <span class="text-base font-semibold">Bank Accounts</span>
      <button
        type="button"
        on:click={addBankAccount}
        class="text-xs text-primary-600 hover:underline"
      >
        + Add More
      </button>
    </div>
    {#each user.bankAccounts ?? [] as account, index (index)}
      <div class="grid grid-cols-5 gap-2 items-center">
        <!-- Payment Method Dropdown -->
        <div class="col-span-2">
          <select
            bind:value={account.method}
            class="input variant-form-material h-10 w-full text-xs"
          >
            {#each Object.values(PaymentMethodEnum) as method}
              <option value={method}>{method.toUpperCase()} ({index})</option>
            {/each}
          </select>
        </div>

        <!-- Input + Remove Button -->
        <div
          class="col-span-3 input-group input-group-divider grid-cols-[1fr_auto] variant-form-material h-10"
        >
          <input
            type="text"
            placeholder="Account number"
            bind:value={account.accountNumber}
            class="h-full"
            required
          />
          <button
            type="button"
            class="variant-filled-error btn-icon rounded-none h-full"
            on:click={() => removeBankAccount(index)}
            aria-label="Remove bank account"
          >
            <Icon src={XMark} />
          </button>
        </div>
      </div>
    {/each}
  </div>

  <!-- Credentials -->
  <div class="grid grid-cols-3 gap-3">
    <span>Email</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="email"
      bind:value={user.email}
      required
    />
    <span>Enter Admin Password</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="password"
      bind:value={user.password}
      required
    />
  </div>

  <div class="flex justify-between pt-4">
    <button class="btn btn-sm variant-filled-primary" type="submit">Update</button>
    <div class="arrow variant-filled-primary" />
  </div>
</form>
