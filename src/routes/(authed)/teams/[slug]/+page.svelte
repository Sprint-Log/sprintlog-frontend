<script>
    import { Icon } from '@steeze-ui/svelte-icon';
     import {SubtractAlt} from '@steeze-ui/carbon-icons';
     import {Add} from '@steeze-ui/carbon-icons';
</script>
<section class="space-y-4 p-3">
<div class="flex items-center">
    <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-9 h-9 me-2 text-surface-800">TS</div>
    <h4>SprintLog</h4>
</div>
<p class="text-xs"> 0 Opine Tasks, 0 Tasks Completed</p>
<span class="text-sm">Efficient office management fosters productivity</span>
<h5>Project Members - 1</h5>
<div class="grid grid-cols-4 gap-3 mt-1">
    <div class="card bg-initial card-hover overflow-hidden ">
        <div class="flex justify-center items-center">
            <span class=" rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-black">TS</span>
            <div class="flex-col justify-center">
                <p class=" text-sm">Thinzar Shun Lett</p>
                <!-- <button class="text-xs underline">Member</button> -->
                <div class="chip px-1 relative" >
                    <!-- component from floatintaskinput -->
                    <span class="underline">Team Owner</span>
                </div>
            </div>
            <button class="w-5 ml-auto me-2">
                <Icon src={SubtractAlt}></Icon> 
            </button>
        </div>
    </div>
<div class="flex items-center justify-start ">
    <button class="btn btn-sm hover:variant-soft  "> 
        <div class="w-9"><Icon src={Add} /></div>Add Member
    </button>
</div>
</div>
</section>