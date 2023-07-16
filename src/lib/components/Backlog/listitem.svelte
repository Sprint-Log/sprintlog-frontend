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

	let client = useQueryClient();
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

<div class="flex space-x-3 space-y-1 pt-1 hover:variant-ringed-primary">
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
		<span class="variant-ringed-surface py-1 px-1 rounded">{item.status}</span>
		<span class="variant-ringed-surface py-1 px-1 rounded">{item.category}</span>
		<span class="variant-ringed-surface py-1 px-1 rounded">{item.priority}</span>
		<span class="variant-ringed-surface py-1 px-1 rounded">{item.progress}</span>
		<span class="variant-soft-surface py-1 px-1 rounded font-mono">⏰ {item.due_date}</span>
		<span class="variant-ghost-surface hover:variant-soft-secondary py-1 px-1 rounded font-mono"
			>@{item.assignee_name}</span
		>
		<span class="hover:variant-soft-primary py-1 px-1 rounded tracking-wide font-mono font-medium"
			>{item.title}</span
		>
		⏱ <span class="variant-soft-surface py-1 px-1 rounded font-mono">{item.beg_date}</span>
		<span class="uppercase variant-ringed-surface py-1 px-1 rounded font-mono">{item.slug}</span>
	</div>
	<span class="inline-flex gap-x-1.5 items-top">
		<slot />
	</span>
</div>
