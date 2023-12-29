<script>
 import { Icon } from '@steeze-ui/svelte-icon';
 import {Close} from '@steeze-ui/carbon-icons';
</script>
<form action="" class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]">
    <div class="grid grid-cols-2 gap-4">
        <h3>Create User</h3>
        <!-- <button class="btn-icon hover:variant-soft ml-auto " ><Icon src={Close} /></button> -->
    </div>
    <div class="flex justify-end">
        <button class="btn-sm w-16 bg-success-500 text-surface-800 rounded ">Admin</button>
    <button class="btn-sm w-16 bg-surface-500 rounded">User</button>
    </div>
    <div class="grid grid-cols-3 gap-3">
       <span >Name</span> 
       <input class="input variant-form-material col-span-2 h-8" type="text"  />
       
    </div>
    <div class="grid grid-cols-3 gap-3">
        <span>Email</span> 
        <input class="input variant-form-material col-span-2 h-8" type="email"  />
        
     </div>
     <div class="grid grid-cols-3 gap-3">
        <span>Password</span> 
        <input class="input variant-form-material col-span-2 h-8" type=""  />
        
     </div>
     <div class="grid grid-cols-3 gap-3">
        <span>Confirm Password</span> 
        <input class="input variant-form-material col-span-2" type=""  />
        
     </div>
    <div class="flex justify-between py-2">
        <button class="text-sm">Back</button>
        <button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
    </div>
</form>