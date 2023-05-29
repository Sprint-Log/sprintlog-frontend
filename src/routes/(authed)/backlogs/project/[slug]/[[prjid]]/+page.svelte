<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import List from '$lib/components/Backlog/list.svelte';
	import ListBox from '$lib/components/Backlog/listbox.svelte';
	import Listitem from '$lib/components/Backlog/listitem.svelte';
	import { page } from '$app/stores';

	const { slug } = $page.params;
	let project_id = $page.params.prjid;

	import type {
		Backlog,
		PriorityEnum,
		ProgressEnum,
		StatusEnum,
		TagEnum
	} from '$lib/types/scrumlog';
	export const load = ({ params }) => {
		return {
			slug: params.slug
		};
	};
	// Import the Project type
	import { createQuery } from '@tanstack/svelte-query';
	import { getBacklogByPrjSlug, getProjects, getTaskByPrjSlug } from '$lib/api/scrumlog';

	let limitBacklog = 3;
	let limitTask = 20;
	let currentPageTask = 1;
	let currentPageBacklog = 1;
	let order = 'desc';

	let intervalMs = 5000;

	$: backlogs = createQuery<Backlog[], Error>({
		queryKey: ['refetch-backlogs', $page.params.slug, currentPageBacklog, limitBacklog, order],
		queryFn: async () =>
			getBacklogByPrjSlug($page.params.slug, currentPageBacklog, limitBacklog, order),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs
	});
	$: tasks = createQuery<Backlog[], Error>({
		queryKey: ['refetch-tasks', $page.params.slug, currentPageTask, limitTask, order],
		queryFn: async () => getTaskByPrjSlug($page.params.slug, currentPageTask, limitTask, order),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs
	});
</script>

<!-- Scrollable container -->
<div class="grid h-full grid-rows-[auto_1fr_auto]">
	<div>
		<ol class="breadcrumb">
			<li class="crumb"><a class="anchor" href="/backlogs/">backlogs</a></li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb"><a class="anchor" href="/projects/">project</a></li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li>{$page.params.slug}</li>
		</ol>
	</div>
	<div class="overflow-y-scroll">
		{#if $tasks.isLoading}
			Loading...
		{/if}
		{#if $tasks.error}
			An error has occurred:
			{$tasks.error.message}
		{/if}
		{#if $tasks.isSuccess}
			<ListBox>
				<span slot="title">Sprint Items</span>
				<span slot="action">
					<a href="#?" class="text-sm font-medium"> Back</a>
					<a href="#?" class="text-sm font-medium"> {currentPageTask} </a>
					<a href="#?" class="text-sm font-medium"> Next </a>
				</span>
				<div>
					<List>
						{#each $tasks.data as backlog}
							<Listitem {backlog} />
						{/each}
					</List>
				</div>
			</ListBox>
		{/if}
		{#if $backlogs.isLoading}
			Loading...
		{/if}
		{#if $backlogs.error}
			An error has occurred:
			{$backlogs.error.message}
		{/if}
	</div>

	<footer
		class="sticky bottom-0 grid grid-rows-[auto_auto_auto] variant-ringed variant-glass-surface pt-2 mx-1 rounded-[10px]"
	>
		{#if $backlogs.isSuccess}
			{#if $backlogs.data.length > 0}
				<ListBox>
					<span slot="title">Backlog Items</span>
					<span slot="action">
						<a href="#" class="text-sm font-medium"> Back</a>
						<a href="#" class="text-sm font-medium"> {currentPageBacklog} </a>
						<a href="#" class="text-sm font-medium"> Next </a>
					</span>
					<div class=" overflow-y-scroll">
						<List>
							{#each $backlogs.data as backlog}
								<Listitem {backlog} />
							{/each}
						</List>
					</div>
				</ListBox>
			{/if}
		{/if}
		<FloatingTask {project_id} />
	</footer>
</div>
