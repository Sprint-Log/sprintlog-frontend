<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import { modalStore } from '@skeletonlabs/skeleton';

  const user: User = $modalStore[0].meta.user;
</script>

<form
  action=""
  class="left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-auto max-h-[36rem]"
>
  <div class="text-center font-bold">
    User Profile 
  </div>

  <div class="grid grid-cols-3 gap-5">
    <span>Name</span>
    <span class="col-span-2">{user.name}</span>
 
    <span>Position</span>
    <span class="col-span-2">{user.position}</span>
 
    <span>Role</span>
    <span class="col-span-2">{user.isSuperuser ? 'Admin' : 'User'}</span>
 
    <span>Address</span>
    <span class="col-span-2">{user.address}</span>
 
    <span>Email</span>
    <span class="col-span-2">{user.email}</span>
  </div>
  {#if user.bankAccounts && user.bankAccounts.length > 0}
    <div class="grid grid-cols-3 gap-5">
      <span>Bank Accounts</span>
      <div class="col-span-2 space-y-2">
        {#each user.bankAccounts as acc, i}
          <div class="flex flex-col border-b pb-1">
            <span class="font-medium">Method:  <span class="font-bold">{acc.method.toUpperCase()}</span></span>
            <span class="text-sm text-gray-600">Account : {acc.accountNumber}</span>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-3 gap-5">
      <span>Bank Accounts</span>
      <span class="col-span-2 italic text-gray-400">No accounts</span>
    </div>
  {/if}

 
</form>
