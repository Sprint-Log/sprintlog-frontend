<script lang="ts">
    // import { User } from 'lucide-svelte';
    // import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
    // import { createQuery } from '@tanstack/svelte-query';
    // import { getCurrentUser } from '$lib/api/sprintlog';
    // import { Modal, modalStore } from '@skeletonlabs/skeleton';
    // import { PROFILE_QUERY_KEY } from '$lib/constants';

    // const currentUser = createQuery<User>({
    //     queryKey: [PROFILE_QUERY_KEY],
    //     queryFn: async() => getCurrentUser() 
    // });
	// $: user = $currentUser.data;
	export let data;

</script>

<section class="p-8 flex-grow overflow-y-auto max-h-screen">
	<p>Welcome {data.user.name}</p>
	<!-- {#if $currentUser.isLoading}
		Loading ...
	{/if}
	{#if $currentUser.error}
		An error has occurred:
		{$currentUser.error.message}
	{/if}
	{#if $currentUser.isSuccess}
		{user.name}
	{/if} -->
	<!-- <div class="flex items-center mb-8 space-x-4">
		<h2 class="font-semibold">Projects</h2>
		<button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
	</div>
	<div class="grid grid-cols-4 gap-3">
		{#if $projects.isLoading}
			Loading...
		{/if}
		{#if $projects.error}
			An error has occurred:
			{$projects.error.message}
		{/if}
		{#if $projects.isSuccess}
			{#each $projects.data as project}
				<ProjectCard {project} />
			{/each}
		{/if}
	</div>
     -->
    <!-- {data.user} -->
</section>