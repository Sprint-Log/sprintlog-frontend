<script lang="ts">
	import type { User } from '$lib/types/sprintlog';
	import { Edit } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	export let data;
	let user: User = data.user;

	function openModal(){
		let modal: ModalSettings = {
			type: 'component',
      		component: 'form',
			meta: { user, user_id: user.id}
		};
		modalStore.trigger(modal);
	}
</script>

<Modal components={{form: { ref: UserUpdateForm}}}/>
<section class="p-6 lg:p-8 flex-grow overflow-y-auto max-h-screen">
	<div class="flex items-center gap-3 mb-6">
		<h2 class="text-xl font-semibold">Profile</h2>
		<button class="btn-icon hover:variant-soft" on:click={openModal}>
			<Icon src={Edit} />
		</button>
	</div>

	<div class="flex flex-col gap-4 text-current">
		<!-- Name, Role, Status -->
		<div class="flex items-center gap-3">
			<p>Name: {user.name}</p>
			<span class="rounded-full text-black bg-surface-200 text-xs px-2 h-5 flex items-center">
				{user.isSuperuser ? 'Admin' : 'User'}
			</span>
			<span
				class="rounded-full text-black text-xs px-2 h-5 flex items-center text-white"
				class:bg-green-500={user.isActive}
				class:bg-red-500={!user.isActive}
			>
				{user.isActive ? 'Active' : 'Inactive'}
			</span>
		</div>

		<p>Position: {user.position}</p>
		<p>Address: {user.address}</p>

		<!-- Bank Accounts -->
		<div>
			<p class="mb-1">Bank Accounts</p>
			{#if user.bankAccounts && user.bankAccounts.length > 0}
				<div class="flex flex-wrap gap-4">
					{#each user.bankAccounts as acc}
						<div class="border rounded  p-3 w-[280px]">
							<p class="font-semibold">Method: <span>{acc.method.toUpperCase()}</span></p>
							<p class="text-sm text-gray-600">Account: {acc.accountNumber}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="italic text-gray-400">No bank accounts added.</p>
			{/if}
		</div>

		<p>Email: {user.email}</p>
	</div>
</section>

