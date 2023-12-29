<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Close} from '@steeze-ui/carbon-icons';
   </script>
   <form action="" class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]">
       <div class="grid grid-cols-2 gap-4">
           <h3>Create User</h3>
           <!-- <button class="btn-icon hover:variant-soft ml-auto " ><Icon src={Close} /></button> -->
       </div>
       <div class="">
        <select name="" id="" class="variant-form-material w-96 text-sm ">
            <option class="text-surface-100" selected >Choose Your Projects</option>
        </select>
       </div>
       <label class="label text-sm">
        <span>Description</span>
        <textarea
            class="input variant-form-material h-24"/>
    </label>
       <div class="flex justify-between py-2">
           <button class="text-sm">Back</button>
           <button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
       </div>
   </form>
