<script lang="ts">
	export let data;
	import { Edit } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	export let user: User = data.user;

	function openModal(){
		let modal: ModalSettings = {
			type: 'component',
      		component: 'form',
			meta: { user, user_id: data.user.id}
		};
		modalStore.trigger(modal);
	}
</script>

<Modal components={{form: { ref: UserUpdateForm}}}/>
<section class="p-8 flex-grow overflow-y-auto max-h-screen">
	<section class="p-8 flex-grow overflow-y-auto max-h-screen">
	<div class="flex items-center mb-8 space-x-4">
		<h2 class="font-semibold">Your profile</h2>
		<button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Edit} /></button>
	</div>

	<div class="flex flex-col gap-2 text-lg">
		<div class="flex items-center gap-1">
			<p>Name: {data.user.name}</p>
			<div
			class="rounded-full flex justify-center items-center bg-surface-200 text-surface-800 text-sm px-2 h-4 mt-1"
			>
			{data.user.isSuperuser ? 'Admin' : 'User'}
			</div>
			<div
			class="rounded-full flex justify-center items-center {data.user.isActive ? 'bg-green-400' : 'bg-red-600'} text-surface-800 text-sm px-2 mx-2 h-4 mt-1"
			>
			{data.user.isActive ? 'Active' : 'Inactive'}
			</div>
		</div>
		
		<p>Position: {data.user.position}</p>
		<p>Role: {data.user.role}</p>
		<p>Address: {data.user.address}</p>
		<p>Bank: {data.user.bankAccount}</p>
		<p>Email: {data.user.email}</p>
	</div>
	<div>

	</div>
</section>
</section>