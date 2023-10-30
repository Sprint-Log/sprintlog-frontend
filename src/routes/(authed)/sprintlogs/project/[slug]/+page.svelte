<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import ListBox from '$lib/components/Sprintlog/ListBox.svelte';
	import Listitem from '$lib/components/Sprintlog/ListItemEdit.svelte';
	import { page } from '$app/stores';
	import type { PageData } from '../../../sprintlogs/project/[slug]/$types';
	import type { SprintlogPagination } from '$lib/types/sprintlog';
	import type { ProjectItems } from '$lib/types/sprintlog';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Resizable from '$lib/resizable';
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getBacklogByPrjSlug, getTaskByPrjSlug } from '$lib/api/sprintlog';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { SprintlogCreate, Sprintlog } from '$lib/types/sprintlog';
	export const load = ({ params }: { params: any }) => {
		return {
			slug: params.slug
		};
	};

	export let data: PageData;
	const { user } = data;
	let item: Sprintlog = {} as Sprintlog;
	let owner_id: string;
	if (user != null) {
		owner_id = user.id;
	}
	let project_slug = $page.params.slug;

	const prjItems: ProjectItems[] = [
		{ text: 'Home', href: '/' },
		{ text: 'Projects', href: '/projects' },
		{ text: project_slug }
	];

	$: taskTotal = 200;
	$: currentPageTask = 0;
	$: amountTask = 200;
	$: backlogTotal = 200;
	$: currentPageBacklog = 0;
	$: amountBacklog = 200;
	let order = 'desc';
	let intervalMs = 15000;
	let cacheTime = 1500000;

	$: tasks = createQuery<SprintlogPagination, Error>({
		queryKey: ['refetch-tasks', currentPageTask, amountTask, order],
		queryFn: async () => {
			return await getTaskByPrjSlug($page.params.slug, currentPageTask, amountTask, order).then(
				(res) => {
					taskTotal = res.total;
					return res;
				}
			);
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs
		// cacheTime: cacheTime
	});
	$: backlogs = createQuery<SprintlogPagination, Error>({
		queryKey: ['refetch-backlogs', currentPageBacklog, amountBacklog, order],
		queryFn: async () => {
			return await getBacklogByPrjSlug(
				$page.params.slug,
				currentPageBacklog,
				amountBacklog,
				order
			).then((res) => {
				backlogTotal = res.total;
				return res;
			});
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs
		// cacheTime: cacheTime
	});
</script>

<main id="page-content" class="w-full h-full max-h-screen">
	<nav class="px-6 py-2 bg-surface-100-800-token">
		<Breadcrumb items={prjItems} />
	</nav>
	<section
		class="container flex-auto gap-y-2 min-h-[80vh] max-h-[90vh] grid grid-rows-[auto_auto_1fr_auto_2fr] max-w-[120rem] mx-auto"
	>
		<div class="px-4 pt-4 flex flex-col">
			<container class="sticky variant-ringed rounded p-2 bg-surface-100-800-token">
				<FloatingTask {project_slug} {item} {user} />
			</container>
		</div>
		<div class="px-4"><h3>Backlogs</h3></div>

		<section class="grid h-full max-h-screen overflow-y-scroll">
			<div class="px-4 rounded h-full">
				{#if $backlogs.isLoading}
					<div class="h-full grid place-items-center">
						<ProgressRadial width="w-12" />
					</div>
				{:else}
					<ListBox>
						{#if $backlogs.isSuccess}
							{#each $backlogs.data.items as task}
								<Listitem item={task} isTask={false} currentUser={user} />
							{/each}
						{/if}
					</ListBox>
				{/if}
			</div>
		</section>
		<div class="px-4"><h3>Tasks</h3></div>
		<section class="grid h-full max-h-screen overflow-y-scroll">
			<div class="px-4 rounded h-full">
				{#if $tasks.isLoading}
					<div class="h-full grid place-items-center">
						<ProgressRadial width="w-12" />
					</div>
				{:else}
					<ListBox>
						{#if $tasks.isSuccess}
							{#each $tasks.data.items as task}
								<Listitem item={task} isTask={true} currentUser={user} />
							{/each}
						{/if}
					</ListBox>
				{/if}
			</div>
		</section>
	</section>
</main>
