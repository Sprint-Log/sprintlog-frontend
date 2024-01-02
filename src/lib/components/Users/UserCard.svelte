<script lang="ts">
    import type { User } from '$lib/types/sprintlog';
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Edit} from '@steeze-ui/carbon-icons';
    import {TrashCan} from '@steeze-ui/carbon-icons';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher<{delete:{id:string}}>();
 
    export let user: User;

    function handleDelUser(){
        dispatch('delete',{
            id: user.id.toString()
        })
    }

</script>
<a href="" class="card bg-initial card-hover overflow-hidden mt-2" >
    <div class="flex">
        <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-10 h-10 m-2 text-black">TS</div>
        
        <div class="flex-1 flex-col justify-center px-2 py-1">
           <div class="flex">
            <span class="me-1">{user.name}</span>
            <div class="rounded-full flex justify-center items-center bg-surface-200 text-surface-800 text-sm px-2 h-4 mt-1">
                {user.isSuperuser ? "Admin":"User"}
            </div>
            <div class="ml-auto">
                <button class="btn-icon hover:variant-soft w-5 mx-4"><Icon src={Edit} /></button>
                <button class="btn-icon hover:variant-soft w-5" on:click ={handleDelUser}><Icon src={TrashCan} /></button>
            </div>
           </div>
           <div class="">
           <p class="text-sm text-surface-400">Member of Sprintlog</p>
           </div>
        </div>
    </div>
</a> 