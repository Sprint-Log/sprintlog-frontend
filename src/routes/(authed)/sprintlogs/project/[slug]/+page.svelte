<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import ListBox from '$lib/components/Sprintlog/ListBox.svelte';
	import Listitem from '$lib/components/Sprintlog/ListItem.svelte';
	import { page } from '$app/stores';
	import type { PageData } from '../../../sprintlogs/project/[slug]/$types';

	export let data: PageData;
	import type { ProjectItems } from '$lib/types/sprintlog';
	const { user } = data;
	let owner_id: string;
	if (user != null) {
		owner_id = user.id;
	}
	let project_slug = $page.params.slug;

	import type {
		Sprintlog,
		SprintlogPagination,
		PriorityEnum,
		ProgressEnum,
		StatusEnum,
		TagEnum
	} from '$lib/types/sprintlog';
	export const load = ({ params }: { params: any }) => {
		return {
			slug: params.slug
		};
	};
	// Import the Project type
	import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
	import {
		getBacklogByPrjSlug,
		getProjects,
		getTaskByPrjSlug,
		switchToBacklog,
		switchToTask
	} from '$lib/api/sprintlog';
	const prjItems: ProjectItems[] = [
		{ text: 'Home', href: '#' },
		{ text: 'Projects', href: '/projects' },
		{ text: project_slug }
	];
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import TaskActions from '$lib/components/Sprintlog/TaskActions.svelte';
	import BacklogActions from '$lib/components/Sprintlog/BacklogActions.svelte';
	import Resizable from '$lib/resizable';
	import { onMount } from 'svelte';

	$: taskTotal = 200;
	$: currentPageTask = 0;
	$: amountTask = 200;
	$: backlogTotal = 200;
	$: currentPageBacklog = 0;
	$: amountBacklog = 200;
	let order = 'desc';
	let intervalMs = 15000;
	let client = useQueryClient();

	$: tasks = createQuery<SprintlogPagination, Error>({
		queryKey: ['refetch-tasks', currentPageTask, amountTask, order],
		queryFn: async () => {
			return await getTaskByPrjSlug($page.params.slug, currentPageTask, amountTask, order).then(
				(res) => {
					taskTotal = res.total;
					// currentPageTask = res.offset;
					return res;
				}
			);
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 0
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
				// currentPageBacklog = res.offset;
				return res;
			});
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 0
	});
	$: taskPager = {
		offset: currentPageTask,
		limit: amountTask,
		size: taskTotal,
		amounts: [100, 200, 500]
	};
	$: backlogPager = {
		offset: currentPageBacklog,
		limit: 5,
		size: backlogTotal,
		amounts: [5]
	};
	function onTaskPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
		currentPageTask = parseInt(e.detail);
	}

	function onTaskAmountChange(e: CustomEvent): void {
		console.log('event:amount', e.detail);
		amountTask = parseInt(e.detail);
	}
	function onBacklogPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
		currentPageBacklog = parseInt(e.detail);
	}

	function onBacklogAmountChange(e: CustomEvent): void {
		console.log('event:amount', e.detail);
		amountBacklog = parseInt(e.detail);
	}

	const handleItemClick = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};
	const toBacklog = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};

	let wrapper: HTMLDivElement;

	onMount(() => {
		document.getElementById('main')!.style.width = wrapper.offsetWidth + 'px';
		document.getElementById('main')!.style.height = wrapper.offsetHeight + 'px';
		Resizable.initialise(
			'main',
			{
				win1: 0.5,
				win2: 0.5
			},
			2
		);
		document.getElementsByClassName('resizer')[0].classList.add('bg-surface-600');

		function onResize() {
			Resizable.activeContentWindows[0].changeSize(wrapper.offsetWidth, wrapper.offsetHeight);
			Resizable.activeContentWindows[0].childrenResize();
		}
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<!-- Scrollable container -->
<div class="flex-grow">
	<nav class="sticky top-0 variant-ringed rounded variant-glass-surface px-2 py-1 mx-1 space-x-4">
		<Breadcrumb items={prjItems} />
	</nav>

	<div class="flex flex-col h-full">
		<div class="flex-grow mb-8" bind:this={wrapper}>
			<div id="main">
				<div class="resizable-top flex flex-col" id="win1">
					<ListBox>
						<svelte:fragment slot="title">Tasks</svelte:fragment>
						<div class="px-4 pt-2 overflow-scroll">
							{#if $tasks.isSuccess}
								{#each $tasks.data.items as task}
									<Listitem item={task}>
										<TaskActions item={task} />
									</Listitem>
								{/each}
							{/if}
						</div>
					</ListBox>
				</div>
				<div class="resizable-bottom flex flex-col" id="win2">
					<ListBox>
						<svelte:fragment slot="title">Backlogs</svelte:fragment>
						<div class="px-4 pt-2">
							{#if $backlogs.isSuccess}
								{#each $backlogs.data.items as task}
									<Listitem item={task}>
										<BacklogActions item={task} />
									</Listitem>
								{/each}
							{/if}
						</div>
					</ListBox>
				</div>
			</div>
		</div>
		<div class="sticky bottom-0 variant-ringed rounded variant-glass-surface p-2 mx-1">
			<FloatingTask {project_slug} {owner_id} />
		</div>
	</div>
</div>
