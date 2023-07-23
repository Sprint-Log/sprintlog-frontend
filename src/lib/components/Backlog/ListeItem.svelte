<script lang="ts">
	import { Checkbox } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckmarkOutline } from '@steeze-ui/carbon-icons';
	import { ArrowUp } from '@steeze-ui/carbon-icons';
	import { TrashCan } from '@steeze-ui/carbon-icons';
	import { ResultNew } from '@steeze-ui/carbon-icons';
	import { ArrowDown } from '@steeze-ui/carbon-icons';
	import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton';
	import { CategoryAdd } from '@steeze-ui/carbon-icons';
	import { FolderDetails } from '@steeze-ui/carbon-icons';
	import { OverflowMenuHorizontal } from '@steeze-ui/carbon-icons';
	import { OverflowMenuVertical } from '@steeze-ui/carbon-icons';
	import { UserAccess } from '@steeze-ui/carbon-icons';
	import { UserAdmin } from '@steeze-ui/carbon-icons';
	import { YAxis } from '@steeze-ui/carbon-icons';
	import { Box } from '@steeze-ui/carbon-icons';
	import { Upgrade } from '@steeze-ui/carbon-icons';
	import { Calendar } from '@steeze-ui/carbon-icons';
	import { DrillDown } from '@steeze-ui/carbon-icons';
	import type { Backlog } from '$lib/types/sprintlog';
	import { progressDownBacklog, progressUpBacklog } from '$lib/api/sprintlog';
	export let item: Backlog;
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	import TaskItem from '$lib/components/Backlog/TaskItem.svelte';

	let client = useQueryClient();
	const handleItemClick = function (event: any, item: any) {
		client.invalidateQueries(['refetch-backlogs']);
	};
	const progressUpMutation = createMutation(
		async function () {
			return progressUpBacklog(item.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
	const progressDownMutation = createMutation(
		async function () {
			return progressDownBacklog(item.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
</script>

<div class="flex space-x-3 space-y-1 hover:variant-ringed-primary">
	<div class="flex flex-row flex-shrink-0 items-top">
		<button
			on:click={() => $progressUpMutation.mutate()}
			type="button"
			class="btn-icon btn-icon-sm variant-surface items-top"
		>
			<Icon src={ArrowUp} size="18px" />
		</button>
		<button
			on:click={() => $progressDownMutation.mutate()}
			type="button"
			class="btn-icon btn-icon-sm variant-surface items-top"
		>
			<Icon src={ArrowDown} size="18px" />
		</button>
	</div>
	<div class="flex-1">
		<TaskItem
			text={item.status}
			color=" hover:variant-soft-secondary"
			typography="text-sm font-bold"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={item.category}
			color=" hover:variant-soft-secondary"
			typography="text-sm font-medium"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={item.priority}
			color=" hover:variant-soft-secondary"
			typography="text-sm font-semibold"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={item.progress}
			color=" hover:variant-soft-secondary"
			typography="text-sm font-normal"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={`⏰${item.due_date}`}
			color=""
			typography="text-sm font-semibold"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={`[${item.slug}]`}
			color="uppercase  hover:variant-soft-secondary"
			typography="text-sm font-mono"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={`@${item.assignee_name}`}
			color=" hover:variant-soft-secondary"
			typography="text-sm font-mono"
			onItemClick={handleItemClick}
		/>
		<TaskItem
			text={item.title}
			color="hover:variant-soft-primary"
			typography="text-sm font-mono"
			onItemClick={handleItemClick}
		/>
		<!-- <TaskItem
			text={`⏱ ${item.beg_date}`}
			color=""
			typography="text-sm font-normal"
			onItemClick={handleItemClick}
		/> -->
	</div>
	<span class="inline-flex gap-x-1.5 items-top">
		<slot />
	</span>
</div>
