<script lang="ts">
	import type { Project } from '$lib/types/sprintlog';
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';
	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
	import { getProjects } from '$lib/api/sprintlog';
	import ProjectForm from '$lib/components/Project/ProjectForm.svelte';
	import { Add } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';

	let limit = 500;
	let page = 1;
	let order = 'desc';

	let intervalMs = 15000;

	let client = useQueryClient();

	$: projects = createQuery<Project[], Error>({
		queryKey: ['refetch-projects', page, limit, order],
		queryFn: async () => getProjects(page, limit, order),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 15000
	});

	function openModal() {
		modalStore.trigger({
			type: 'component',
			component: 'form'
		});
	}
</script>

<Modal components={{ form: { ref: ProjectForm } }} />
<section class="p-8 flex-grow overflow-y-auto max-h-screen">
	<div class="flex items-center mb-8 space-x-4">
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
</section>
