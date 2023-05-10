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
	import type { Backlog } from '$lib/types/backlog';
	export let backlog: Backlog;
</script>

<li class="py-1">
	<div class="flex items-top space-x-4 pt-1">
		<div class="flex-shrink-0">
			<Icon src={ArrowUp} size="24px" />
			<Icon src={ArrowDown} size="24px" />
		</div>
		<div class="flex-1 min-w-0">
			<Accordion padding="px-1 py-0">
				<AccordionItem>
					<svelte:fragment slot="summary">
						<p>
							<span class="text">{backlog.status} {backlog.progress} {backlog.priority} </span>
							<span class="font-mono">{backlog.title}</span>
							<span class="font-mono">
								For: {backlog.assignee}
								<a href={`[${backlog.id}]`}
									>[{backlog.project.slug}-S{backlog.sprint}-{backlog.id}]</a
								>
								<a href="">(EST:{backlog.estimated_time})</a>
								<a href="">(DUE:{backlog.due_date})</a>
								{backlog.category}
							</span>
						</p>
					</svelte:fragment>
					<svelte:fragment slot="content">
						{backlog.description}
						<a href="">(EST:{backlog.estimated_time})</a>
						<a href="">(DUE:{backlog.due_date})</a>
						<a href="">(BEG:{backlog.start_date})</a>
						<a href="">(CRE:{backlog.created})</a>
						<a href="">(UPD:{backlog.updated})</a>
						<a href="">(Sprint:{backlog.sprint})</a>
						<a href="">(Sprint:{backlog.project.name})</a>
					</svelte:fragment>
				</AccordionItem>
				<!-- ... -->
			</Accordion>
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
