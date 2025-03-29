<script lang="ts">
  import type { UserCreate } from '$lib/types/sprintlog';
  import { createUser } from '$lib/api/sprintlog';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';
  import { USERS_QUERY_KEY } from '$lib/constants';
  import { PaymentMethodEnum } from '$lib/types/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { XMark } from '@steeze-ui/heroicons';

  let user: UserCreate = {
    email: '',
    password: '',
    name: '',
    isSuperuser: true,
    isActive: false,
    isVerified: false,
    address: '',
    position: '',
    bankAccounts: []
  };

  // default active button
  const client = useQueryClient();
  const active_btn = 'bg-success-500 text-black';
  const unactive_btn = 'bg-surface-500 text-white';

  $: bankAcc = '';
  let confirmPassword: string;
  let toggleAdminBtn = true;
  let pswdMismatch = false;
  let selectedBank: PaymentMethodEnum | null = Object.values(PaymentMethodEnum)[0];
  let bankAccounts: { method: string; accountNumber: string }[] = [
    { method: PaymentMethodEnum.K_PAY, accountNumber: '' }
  ];
  const userMutation = createMutation({
    mutationFn: () => createUser(user),

    onSuccess: (data) => {
      client.setQueriesData([USERS_QUERY_KEY, data.id], data);
      client.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      modalStore.close();
    },
    onError: () => {
      toastStore.trigger({ message: 'Something went wrong', background: 'variant-filled-error' });
    }
  });

  function handleUserType(event: MouseEvent) {
    let value = (event.target as HTMLButtonElement).value;
    toggleAdminBtn = value === 'admin';
    user.isSuperuser = toggleAdminBtn;
  }

  function addBankAccount() {
    bankAccounts = [...bankAccounts, { method: PaymentMethodEnum.K_PAY, accountNumber: '' }];
  }

  function removeBankAccount(index: number) {
    bankAccounts = bankAccounts.filter((_, i) => i !== index);
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (confirmPassword !== user.password) {
      pswdMismatch = true;
      return;
    }
    user.bankAccounts = bankAccounts.filter((b) => b.accountNumber.trim() !== '');
    if (selectedBank != null && bankAcc != null && bankAcc.length > 0) {
      user.bankAccounts?.push({
        method: selectedBank,
        accountNumber: bankAcc
      });
    }
    $userMutation.mutate();
  }
</script>

<Toast />
<form
  on:submit={handleSubmit}
  action="?/create"
  class="left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2 gap-4">
    <h3>Create User</h3>
  </div>

  
  <div class="flex justify-end">
    <button
      type="button"
      class="btn-sm w-16 rounded {toggleAdminBtn ? active_btn : unactive_btn}"
      value="admin"
      on:click={handleUserType}>Admin</button
    >
    <button
      type="button"
      class="btn-sm w-16 rounded {toggleAdminBtn ? unactive_btn : active_btn}"
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
      bind:value={user.address}
    />
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Position</span>
    <input
      class="input variant-form-material col-span-2 h-8"
      type="text"
      bind:value={user.position}
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
    {#each bankAccounts as account, index (index)}
      <div class="grid grid-cols-5 gap-2 items-center">
        <!-- Payment Method Dropdown -->
        <div class="col-span-2">
          <select
            bind:value={account.method}
            class="input variant-form-material h-10 w-full text-xs"
          >
            {#each Object.values(PaymentMethodEnum) as method}
              <option value={method}>{method.toUpperCase()}</option>
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
      class="input variant-form-material col-span-2 h-8"
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
