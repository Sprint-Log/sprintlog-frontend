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
	export let backlog: Backlog;
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';

	let client = useQueryClient();
	const progressUpMutation = createMutation(
		async function () {
			return progressUpBacklog(backlog.slug);
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
			return progressDownBacklog(backlog.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
</script>

<div class="flex items-top space-x-3 space-y-2 pt-1 hover:variant-soft py-1 my-1">
	<div class="flex flex-col flex-shrink-0">
		<button
			on:click={() => $progressUpMutation.mutate()}
			type="button"
			class="btn-icon btn-icon-sm variant-surface"><Icon src={ArrowUp} size="20px" /></button
		>
		<button
			on:click={() => $progressDownMutation.mutate()}
			type="button"
			class="btn-icon btn-icon-sm variant-surface"><Icon src={ArrowDown} size="20px" /></button
		>
	</div>
	<div class="flex-1 min-w-0">
		<p>
			<span class="text"> {backlog.status} {backlog.priority} {backlog.progress} </span>
			<span class="font-mono">{backlog.title}</span>
			<span class="font-mono">
				- Assigned To : {backlog.assignee_name}
			</span>
			<span>
				[{backlog.slug}]
				{backlog.category}
			</span>
		</p>
		<p>
			{backlog.description}
			<span class="text-xs border-red-700">DUE:{backlog.due_date}</span>
			<span class="text-xs">EST:{backlog.est_days}</span>
			<span class="text-xs">BEG:{backlog.beg_date}</span>
			<span class="text-xs">CRE:{backlog.created_at}</span>
			<span class="text-xs">UPD:{backlog.updated_at}</span>
			<span class="text-xs">Sprint:{backlog.sprint_number}</span>
			<span class="text-xs">Project:{backlog.project_slug}</span>
		</p>
	</div>
	<div class="inline-flex lg:items-top gap-x-1.5">
		<slot />
	</div>
</div>
