<script lang="ts">
  import type { User } from '$lib/types/sprintlog';
  import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';
  
  const user: User = $modalStore[0].meta.user;
</script>

<form
  action=""
  class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2">
    <h3>User Profile</h3>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <span>Name</span>
    <span class="col-span-2"> 
      {user.name}
    </span>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <span>Position</span>
    <span class="col-span-2">{user.position}</span>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <span>Role</span>
    <span class="col-span-2">
      {user.isSuperuser? 'Admin':'User'}
    </span>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <span>Address</span>
    <span class="col-span-2">{user.address}</span>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <span>Bank</span>
    <span class="col-span-2">{user.bankAccount}</span>
  </div>
  <!-- <div class="grid grid-cols-3 gap-5">
    <span>Bank</span>
    <span class="col-span-2">{user.bankAccNum}</span>
  </div> -->
  <div class="grid grid-cols-3 gap-5">
    <span>Email</span>
    <span class="col-span-2">
      {user.email}
    </span>
  </div>
</form>
