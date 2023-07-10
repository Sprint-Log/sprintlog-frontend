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

<div class="flex items-top space-x-3 space-y-2 pt-1 hover:variant-ringed">
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
	<div class="flex-1">
			<span class="cursor-pointer p-0.5  hover:variant-filled-surface rounded font-mono font-medium">
				{backlog.status}
			</span> 
			<span class="cursor-pointer p-0.5  hover:variant-filled-surface rounded font-mono font-medium">
				{backlog.priority}
			</span> 
			<span class="cursor-pointer p-0.5  hover:variant-filled-surface rounded font-mono font-medium">
				{backlog.progress}
			</span> 
			<span class="cursor-pointer p-0.5  hover:variant-filled-surface rounded font-mono font-medium">
				{backlog.category}
			</span> 
				<span class="chip variant-soft hover:variant-filled-surface rounded font-mono font-medium">@{backlog.assignee_name}</span>
			<span class="font-mono font-medium">{backlog.title}</span>
            <span class="text-xs">DUE:{backlog.due_date}</span>
			<span class="text-xs">EST:{backlog.est_days}</span>
			<span class="text-xs">BEG:{backlog.beg_date}</span>
			<span class="text-xs">CRE:{backlog.created_at}</span>
			<span class="text-xs">UPD:{backlog.updated_at}</span>
			<span class="font-mono">[{backlog.slug}]</span>
            <div class="inline-flex gap-x-1.5">
                <slot />
            </div>
	</div>
</div>
