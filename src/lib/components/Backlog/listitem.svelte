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
	import type { Backlog } from '$lib/types/scrumlog';
	export let backlog: Backlog;
</script>

<li class="py-1">
	<div class="flex items-top space-x-4 pt-1">
		<div class="flex-shrink-0">
			<Icon src={ArrowUp} size="24px" />
			<Icon src={ArrowDown} size="24px" />
		</div>
		<div class="flex-1 min-w-0">
			<p>
				<span class="text"> {backlog.status} {backlog.priority} {backlog.progress} </span>
				<span class="font-mono">{backlog.title}</span>
				<span class="font-mono">
					For: {backlog.assignee_id}
					<a href={`/backlogs/details/${backlog.id}`}>[{backlog.slug}]</a>
					{backlog.category}
				</span>
			</p>
			<p>
				{backlog.description}
				<span class="text-xs border-red-700">DUE:{backlog.due_date}</span>
				<span class="text-xs">EST:{backlog.est_days}</span>
				<span class="text-xs">BEG:{backlog.beg_date}</span>
				<span class="text-xs">CRE:{backlog.created}</span>
				<span class="text-xs">UPD:{backlog.updated}</span>
				<span class="text-xs">Sprint:{backlog.sprint_number}</span>
				<span class="text-xs">Project:{backlog.project_id}</span>
			</p>
		</div>
		<div class="inline-flex lg:items-top gap-x-1.5">
			<Icon src={OverflowMenuVertical} size="24px" />
			<Icon src={Upgrade} size="24px" />
			<Icon src={UserAdmin} size="24px" />
			<Icon src={Calendar} size="24px" />
			<Icon src={CheckmarkOutline} size="24px" />
		</div>
	</div>
</li>
<br />
