<script>
	import { Checkbox } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckmarkOutline } from '@steeze-ui/carbon-icons';
	import { ArrowUp } from '@steeze-ui/carbon-icons';
	import { TrashCan } from '@steeze-ui/carbon-icons';
	import { ResultNew } from '@steeze-ui/carbon-icons';
	import { ArrowDown } from '@steeze-ui/carbon-icons';
	import { ProgressBar } from '@skeletonlabs/skeleton';
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
</script>

<li class="my-1">
	<div class="flex items-top space-x-4 pt-1">
		<div class="flex-shrink-0">
			<Icon src={ArrowUp} size="24px" />
			<Icon src={ArrowDown} size="24px" />
		</div>
		<div class="flex-1 min-w-0">
			<p class="text-sm font-mono">
				✅🟩🟩🟩 🟡 Point of contact and links need to be fixed in summary and detail views Point of
				contact and links need to be fixed in summary and detail views Point of contact and links
				need to be fixed in summary and detail views.
			</p>
			<p>
				🚀 @v3ss0n <a href="">[ITQ-S1-1232]</a>
				<a href="">(DUE:05-05-2023)</a> <a href="">(CRE:05-05-2023)</a>
				<a href="">(UPD:05-05-2023)</a> <a href="">(Sprint:1)</a>
			</p>
		</div>
		<div class="inline-flex lg:items-center gap-2">
			<Icon src={OverflowMenuVertical} size="24px" />
			<Icon src={Upgrade} size="24px" />
			<Icon src={UserAdmin} size="24px" />
			<Icon src={Calendar} size="24px" />
			<Icon src={CheckmarkOutline} size="24px" />
		</div>
	</div>
</li>
<hr />
