<script lang="ts">
	import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
	let currentVariant = 'bg-initial';
	// Import the Project type
	import type { Project } from '$lib/types/scrumlog';
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getProjects } from '$lib/api/scrumlog';

	let limit = 5;
	let page = 1;
	let order = 'desc';

	let intervalMs = 5000;

	$: projects = createQuery<Project[], Error>({
		queryKey: ['refetch', page, limit, order],
		queryFn: async () => getProjects(page, limit, order),
		refetchInterval: intervalMs
	});
</script>

<section class="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
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
</section>
