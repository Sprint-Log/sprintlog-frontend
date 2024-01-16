<script>
  import SearchBox from './SearchBox.svelte';
    
</script>
   <form action="" class=" left-24 card bg-surface-100 p-3 rounded-md space-y-2 max-w-3xl  max-h-[36rem]">
       <div class="flex justify-between bg-surface-800">
           <h4>Add Member</h4>
           <div class="">
            <SearchBox></SearchBox>
           </div>
       </div>
      <div class="overflow-y-auto max-h-[28rem]">
        <div class="grid grid-cols-5">
            <div class="col-span-2 flex items-center text-sm">
                <span class=" rounded-full bg-surface-200 flex justify-center items-center w-8 h-8 m-2 text-black">TS</span>
                <p>Thinzar Shun Lett</p>
            </div>
            <div class="col-span-2 flex justify-center items-center ml-auto">
                <select id="countries" class="variant-form-material rounded h-8 text-xs focus:ring-primary-500 focus:border-surface-500">
                    <option class="bg-surface-800" selected>Choose Role</option>
                    <option class="bg-surface-800" >Team Owner</option>
                    <option class="bg-surface-800" >Member</option>
                  </select>
            </div>
            <div class="flex justify-center items-center ml-auto p-2">
                <input type="checkbox" name="" id="" class="text-primary-500 focus:ring-primary-500 focus:border-surface-500 rounded">
            </div>
        </div>
      </div>
    <hr class="opacity-50" />
    <div class="text-right ">
		<button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
	</div>
   </form>
