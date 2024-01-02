<script>
    import { Icon } from '@steeze-ui/svelte-icon';
     import {SubtractAlt} from '@steeze-ui/carbon-icons';
     import {Add} from '@steeze-ui/carbon-icons';
</script>
<div class="flex items-center">
    <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-9 h-9 me-2 text-surface-800">TS</div>
    <h4>SprintLog</h4>
</div>
<p class="text-xs"> 0 Opine Tasks, 0 Tasks Completed</p>
<span class="text-sm">Efficient office management fosters productivity</span>
<h5>Project Members-0</h5>
<div class="grid grid-cols-5 ">
<div class="card bg-initial card-hover overflow-hidden mt-2">
    
    <div class="flex">
        <span class=" rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-black">TS</span>
        <div class="flex-col justify-center">
            <p class="me-1">Thinzar</p>
            <button class="text-xs underline">Member</button>
        </div>
        <div class="w-5 ml-auto me-2">
            <Icon src={SubtractAlt}></Icon> 
         </div>
    </div>
    
</div>
<div class="flex mt-2 items-center justify-start">
    <button class="btn btn-sm hover:variant-soft  "> 
        <div class="w-9"><Icon src={Add} /></div>Add Member
    </button>
</div>
</div>