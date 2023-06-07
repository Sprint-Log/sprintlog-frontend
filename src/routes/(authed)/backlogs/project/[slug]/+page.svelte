<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import List from '$lib/components/Backlog/list.svelte';
	import ListBox from '$lib/components/Backlog/listbox.svelte';
	import Listitem from '$lib/components/Backlog/listitem.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

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
	} from '$lib/types/scrumlog';
	export const load = ({ params }) => {
		return {
			slug: params.slug
		};
	};
	// Import the Project type
	import { createQuery } from '@tanstack/svelte-query';
	import { getBacklogByPrjSlug, getProjects, getTaskByPrjSlug } from '$lib/api/scrumlog';
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
	import { Paginator } from '@skeletonlabs/skeleton';

	$: backlogTotal = 5;
	$: taskTotal = 20;
	$: currentPageTask = 0;
	$: currentPageBacklog = 0;
	$: amountTask = 10;
	$: amountBacklog = 5;
	let order = 'desc';
	let intervalMs = 5000;

	$: backlogs = createQuery<BacklogPagination, Error>({
		queryKey: ['refetch-backlogs', currentPageBacklog, amountBacklog, order],
		queryFn: async () => {
			return await getBacklogByPrjSlug(
				$page.params.slug,
				currentPageBacklog === 0 ? 1 : currentPageBacklog,
				amountBacklog,
				order
			).then((res) => {
				backlogTotal = res.total;
				console.log(backlogTotal);
				return res;
			});
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 0
	});
	$: tasks = createQuery<BacklogPagination, Error>({
		queryKey: ['refetch-tasks', currentPageTask, amountTask, order],
		queryFn: async () => {
			return await getTaskByPrjSlug(
				$page.params.slug,
				currentPageTask === 0 ? 1 : currentPageTask,
				amountTask,
				order
			).then((res) => {
				taskTotal = res.total;
				console.log(taskTotal);
				return res;
			});
		},
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		refetchInterval: intervalMs,
		cacheTime: 0
	});
	$: backlogPager = {
		offset: currentPageBacklog,
		limit: 5,
		size: backlogTotal,
		amounts: [5, 10, 20, 50]
	};
	$: taskPager = {
		offset: currentPageTask,
		limit: 5,
		size: taskTotal,
		amounts: [5, 10, 20, 50]
	};
	function onBacklogPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
		currentPageBacklog = parseInt(e.detail);
	}

	function onBacklogAmountChange(e: CustomEvent): void {
		console.log('event:amount', e.detail);
		amountBacklog = parseInt(e.detail);
	}
	function onTaskPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
		currentPageTask = parseInt(e.detail);
	}

	function onTaskAmountChange(e: CustomEvent): void {
		console.log('event:amount', e.detail);
		amountTask = parseInt(e.detail);
	}
</script>

<!-- Scrollable container -->

<div class="grid h-full grid-rows-[1fr_auto]">
	<ListBox>
		<span slot="title">Sprint Items</span>
		<span slot="action">
			<Paginator
				bind:settings={taskPager}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
				on:page={onTaskPageChange}
				on:amount={onTaskAmountChange}
			/>
		</span>
		<div>
			<List>
				{#if $tasks.isSuccess}
					{#each $tasks.data.items as task}
						<div class="h-full overflow-y-scroll">
							<Listitem backlog={task}>
								<Icon src={OverflowMenuVertical} size="18px" />
								<Icon src={DownToBottom} size="18px" />
								<Icon src={UserAdmin} size="18px" />
								<Icon src={Calendar} size="18px" />
								<Icon src={CheckmarkOutline} size="18px" />
							</Listitem>
						</div>
					{/each}
				{/if}
			</List>
		</div>
	</ListBox>

	<footer
		class="sticky bottom-0 grid grid-rows-[1hr_1hr] variant-ringed variant-glass-surface pt-2 mx-1 rounded-[10px]"
	>
		<ListBox>
			<span slot="title">Backlog Items</span>
			<span slot="action">
				<Paginator
					bind:settings={backlogPager}
					showFirstLastButtons={false}
					showPreviousNextButtons={true}
					on:page={onBacklogPageChange}
					on:amount={onBacklogAmountChange}
				/>
			</span>
			<div class=" overflow-y-scroll max-h-[400px]">
				<List>
					{#if $backlogs.isSuccess}
						{#if $backlogs.data.items.length > 0}
							{#each $backlogs.data.items as backlog}
								<Listitem {backlog}>
									<Icon src={OverflowMenuVertical} size="18px" />
									<Icon src={UpToTop} size="18px" />
									<Icon src={UserAdmin} size="18px" />
									<Icon src={Calendar} size="18px" />
									<Icon src={CheckmarkOutline} size="18px" />
								</Listitem>
							{/each}
						{/if}
					{/if}
				</List>
			</div>
		</ListBox>
		<FloatingTask {project_slug} {owner_id} />
	</footer>
</div>
