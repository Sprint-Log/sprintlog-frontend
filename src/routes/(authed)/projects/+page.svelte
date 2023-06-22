<script lang="ts">
	import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
	let currentVariant = 'bg-initial';
	// Import the Project type
	import type { Project, ProjectCreate } from '$lib/types/sprintlog';
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getProjects, createProject } from '$lib/api/sprintlog';
	import ProjectForm from '$lib/components/Project/ProjectForm.svelte';

	let limit = 5;
	let page = 1;
	let order = 'desc';

	let intervalMs = 5000;
	let prj: ProjectCreate = {
		name: '',
		slug: ''
	};
	$: projects = createQuery<Project[], Error>({
		queryKey: ['refetch', page, limit, order],
		queryFn: async () => getProjects(page, limit, order),
		refetchInterval: intervalMs
	});
</script>

<section class="p-4 grid grid-cols-4 h-1/4 gap-3">
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
	<ProjectForm onSubmit={createProject} project={prj} />
</section>
