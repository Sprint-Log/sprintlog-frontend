<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Add} from '@steeze-ui/carbon-icons';
    import {Search} from '@steeze-ui/carbon-icons';
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    import UserForm from '$lib/components/Users/UserForm.svelte';
    function openModal() {
		modalStore.trigger({
			type: 'component',
			component: 'form'
		});
	}

</script>
<Modal components={{ form: { ref: UserForm } }} />
    <div class="basis-1/3 mb-8 space-x-4 p-2 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25 ">
		<div class="flex items-center ">
            <h3 class="font-semibold">Users</h3>
		<button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
        </div>
        <div class="grid gap-3 ">
            
        </div>
        <div class="flex flex-col items-center my-64">
            <button class=" flex text-2xl btn border border-surface-200 rounded opacity-30 " on:click={openModal}>
                Create User <div class="w-9"><Icon src={Add} /></div>
            </button>
        </div>
	</div>
    <div class="basis-4/5 mb-8 space-x-4 ">
		<nav class="flex justify-between bg-surface-800 px-6 py-2">
            <div class=""><button class="hover:underline">Home</button></div>
            <div class="">
                <form action="" class="">
                    <div class="flex w-56 border border-surface-200  rounded">
                        <div class="w-4 mx-2">
                            <Icon src={Search}></Icon> 
                         </div>
                         <label for="" class="text-sm">Search</label>
                    </div>
                </form>
            </div>
        </nav>

       
       <div class="flex flex-col items-center my-72">
        <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a user</p>
       </div>
	</div>
