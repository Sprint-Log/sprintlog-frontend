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
    <div class="basis-1/3 space-x-4 p-4 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25 ">
		<div class="flex items-center ">
            <h2 class="font-semibold">Teams</h2>
		<button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
        </div>
        <div class="grid gap-3 ">
            <div class="flex flex-col items-center my-64">
                <button class=" flex text-2xl btn border border-surface-200 rounded opacity-30" on:click={openModal}>
                    Create Team <div class="w-9"><Icon src={Add} /></div>
                </button>
            </div>
           <!-- team card add -->
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
            <!-- Team view add -->
        </section>
       <div class="flex flex-col items-center justify-center h-screen">
        <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a team</p>
       </div>
	</div>
