
   
   <script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Search} from '@steeze-ui/carbon-icons';
    
</script>
   <form action="" class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]">
       <div class="grid grid-cols-2 gap-4">
           <h3>Add Member</h3>
           <form action="" class="flex w-56 border border-surface-200 items-center rounded">
                <div class="w-4 mx-2">
                    <Icon src={Search}></Icon> 
                 </div>
                 <label for="" class="text-sm">Search</label>
            </form>
       </div>
       <div class="grid grid-cols-4 ">
        <div class="flex items-center">
            <span class=" rounded-full bg-surface-200 flex justify-center items-center w-8 h-8 m-2 text-black">TS</span>
            <p>Thinzar</p>
        </div>
        <div class="col-span-2 flex justify-center items-center ">
            <select name="" id="" class="variant-form-material h-8 w-3/4 text-xs text-center">
                <option class="text-surface-100 " selected >Choose Role</option>
            </select>
        </div>
        
        <input type="checkbox" name="" id="" class="ml-auto">
       </div>
    <hr class="opacity-50" />
       <div class="flex justify-between ">
           <button class="text-sm">Back</button>
           <button class="btn btn-sm variant-filled-primary" type="submit"> Add </button>
       </div>
   </form>
