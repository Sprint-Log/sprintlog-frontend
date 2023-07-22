<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import List from '$lib/components/Backlog/list.svelte';
	import ListBox from '$lib/components/Backlog/listbox.svelte';
	import Listitem from '$lib/components/Backlog/listitem.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	import type { ProjectItems } from '$lib/types/sprintlog';
	const { user } = data;
	let owner_id: string;
	if (user != null) {
		owner_id = user.id;
	}
	let project_slug = $page.params.slug;

	import type {
		Backlog,
		BacklogPagination,
		PriorityEnum,
		ProgressEnum,
		StatusEnum,
		TagEnum
	} from '$lib/types/sprintlog';
	export const load = ({ params }) => {
		return {
			slug: params.slug
		};
	};
	// Import the Project type
	import { createQuery } from '@tanstack/svelte-query';
	import { getBacklogByPrjSlug, getProjects, getTaskByPrjSlug } from '$lib/api/sprintlog';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		CheckmarkOutline,
		OverflowMenuVertical,
		Upgrade,
		UserAdmin,
		Calendar,
		DownToBottom,
		UpToTop
	} from '@steeze-ui/carbon-icons';
	const prjItems: ProjectItems[] = [
		{ text: 'Home', href: '#' },
		{ text: 'Projects', href: '/projects' },
		{ text: project_slug }
	];
	import { Paginator } from '@skeletonlabs/skeleton';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	$: taskTotal = 200;
	$: currentPageTask = 0;
	$: amountTask = 200;
	$: backlogTotal = 200;
	$: currentPageBacklog = 0;
	$: amountBacklog = 200;
	let order = 'desc';
	let intervalMs = 15000;

	$: tasks = createQuery<BacklogPagination, Error>({
		queryKey: ['refetch-tasks', currentPageTask, amountTask, order],
		queryFn: async () => {
			return await getTaskByPrjSlug($page.params.slug, currentPageTask, amountTask, order).then(
				(res) => {
					taskTotal = res.total;
					// currentPageTask = res.offset;
					console.log(taskTotal);
					return res;
				}
			);
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 0
	});
	$: backlogs = createQuery<BacklogPagination, Error>({
		queryKey: ['refetch-backlogs', currentPageBacklog, amountBacklog, order],
		queryFn: async () => {
			return await getBacklogByPrjSlug(
				$page.params.slug,
				currentPageBacklog,
				amountBacklog,
				order
			).then((res) => {
				backlogTotal = res.total;
				console.log(backlogTotal);
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

	function handleOverflowMenuClick() {
		// Handle the click event for OverflowMenuVertical icon
		// Open the options menu in the chatroom
		// Perform actions like editing, deleting, or assigning tasks
	}

	function handleUpToTopClick() {
		// Handle the click event for UpToTop icon
		// Scroll back to the top of the sprint planning page
	}

	function handleDownToBottomClick() {
		// Handle the click event for UpToTop icon
		// Scroll back to the top of the sprint planning page
	}

	function handleUserAdminClick() {
		// Handle the click event for UserAdmin icon
		// Access administrative features for analytics and reporting
	}

	function handleCalendarClick() {
		// Handle the click event for the Calendar icon
		// Perform specific action related to the calendar
	}

	function handleCheckmarkClick() {
		// Handle the click event for the CheckmarkOutline icon
		// Perform specific action related to the checkmark
	}

	function handleKeyDown(event) {
		// Handle keydown events for the icons
		if (event.key === 'Enter') {
			switch (event.currentTarget.id) {
				case 'overflowMenu':
					handleOverflowMenuClick();
					break;
				case 'upToTop':
					handleUpToTopClick();
					break;
				case 'userAdmin':
					handleUserAdminClick();
					break;
				case 'calendar':
					handleCalendarClick();
					break;
				case 'checkmark':
					handleCheckmarkClick();
					break;
				default:
					break;
			}
		}
	}
</script>

<!-- Scrollable container -->
<main id="page-content" class="flex flex-col w-full h-full overflow-auto">
	<section
		class="sticky top-0 variant-ringed rounded variant-glass-surface px-2 py-1 mx-1 space-x-4"
	>
		<Breadcrumb items={prjItems} />
	</section>
	<ListBox>
		<svelte:fragment slot="title">Sprint</svelte:fragment>
		<div class="grid grid-rows auto-rows-min h-[70%] overflow-scroll">
			{#if $tasks.isSuccess}
				{#each $tasks.data.items as task}
					<Listitem item={task}>
						<span id="overflowMenu" on:click={handleOverflowMenuClick} on:keydown={handleKeyDown}>
							<Icon src={OverflowMenuVertical} size="18px" />
						</span>

						<span id="upToTop" on:click={handleDownToBottomClick} on:keydown={handleKeyDown}>
							<Icon src={DownToBottom} size="18px" />
						</span>

						<span id="userAdmin" on:click={handleUserAdminClick} on:keydown={handleKeyDown}>
							<Icon src={UserAdmin} size="18px" />
						</span>

						<span id="calendar" on:click={handleCalendarClick} on:keydown={handleKeyDown}>
							<Icon src={Calendar} size="18px" mark />
						</span>

						<span id="checkmark" on:click={handleCheckmarkClick} on:keydown={handleKeyDown}>
							<Icon src={CheckmarkOutline} size="18px" mark />
						</span>
					</Listitem>
				{/each}
			{/if}
		</div>
	</ListBox>
	<ListBox>
		<svelte:fragment slot="title">Backlog</svelte:fragment>
		<div class="grid grid-rows auto-rows-min overflow-scroll mb-auto">
			{#if $backlogs.isSuccess}
				{#each $backlogs.data.items as backlog}
					<Listitem item={backlog}>
						<span id="overflowMenu" on:click={handleOverflowMenuClick} on:keydown={handleKeyDown}>
							<Icon src={OverflowMenuVertical} size="18px" />
						</span>

						<span id="upToTop" on:click={handleUpToTopClick} on:keydown={handleKeyDown}>
							<Icon src={UpToTop} size="18px" />
						</span>

						<span id="userAdmin" on:click={handleUserAdminClick} on:keydown={handleKeyDown}>
							<Icon src={UserAdmin} size="18px" />
						</span>

						<span id="calendar" on:click={handleCalendarClick} on:keydown={handleKeyDown}>
							<Icon src={Calendar} size="18px" mark />
						</span>

						<span id="checkmark" on:click={handleCheckmarkClick} on:keydown={handleKeyDown}>
							<Icon src={CheckmarkOutline} size="18px" mark />
						</span>
					</Listitem>
				{/each}
			{/if}
		</div>
	</ListBox>
	<footer class="sticky bottom-0 variant-ringed rounded variant-glass-surface p-2 mx-1">
		<FloatingTask {project_slug} {owner_id} />
	</footer>
</main>
<aside />
