<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Add} from '@steeze-ui/carbon-icons';
    import {Search} from '@steeze-ui/carbon-icons';
    import {SubtractAlt} from '@steeze-ui/carbon-icons';
    import TeamForm from '$lib/components/Teams/TeamForm.svelte';
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    
   
    function openModal() {
		modalStore.trigger({
			type: 'component',
			component: 'form'
		});
	}

</script>
    <Modal components={{ form: { ref: TeamForm } }} />
    <div class="basis-1/3 mb-8 space-x-4 p-4 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25 ">
		<div class="flex items-center ">
            <h2 class="font-semibold">Teams</h2>
		<button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
        </div>
        <div class="grid gap-3 ">
           
        </div>
        <div class="flex flex-col items-center my-64">
            <button class=" flex text-2xl btn border border-surface-200 rounded opacity-30" on:click={openModal}>
                Create Team <div class="w-9"><Icon src={Add} /></div>
            </button>
        </div>
	</div>
    <div class="basis-4/5 mb-8 space-x-4 ">
		<nav class="flex justify-between bg-surface-800 px-6 py-2">
            <div class=""><button class="hover:underline">Home</button></div>
            <div class="">
                <form action="" class="flex w-56 border border-surface-200 items-center rounded">
                    <div class="w-4 mx-2">
                        <Icon src={Search}></Icon> 
                     </div>
                     <label for="" class="text-sm">Search</label>
                </form>
            </div>
        </nav>
        <section class="space-y-4 mt-3">
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
        </section>
       <div class="flex flex-col items-center my-72">
        <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a team</p>
       </div>
	</div>
