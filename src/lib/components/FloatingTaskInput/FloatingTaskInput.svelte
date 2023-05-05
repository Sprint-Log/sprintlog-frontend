<script lang="ts">
	import OptionalPopup from './OptionalPopup.svelte';
	import OptionalRow from './OptionalRow.svelte';
	import Sprints from './Sprints.svelte';
	import Progress from './Progress.svelte';
	import Priority from './Priority.svelte';
	import Statuses from './Status.svelte';
	import ItemType from './ItemTypeChoices.svelte';
	import Tags from './Tags.svelte';
	import Projects from './Projects.svelte';
	import Team from './Team.svelte';
	let topic = '';
	let description = '';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import ItemTypeChoices from './ItemTypeChoices.svelte';
	import StatusChoices from './StatusChoices.svelte';
	import TagsChoices from './TagsChoices.svelte';
	import PriorityChoices from './PriorityChoices.svelte';
	import ProgressChoices from './ProgressChoices.svelte';
	let progressSettings: PopupSettings = {
		event: 'click',
		target: 'prgPopup',
		placement: 'top'
	};
	let statusPopupSettings: PopupSettings = {
		event: 'click',
		target: 'statPopup',
		placement: 'top'
	};
	let priPopupSettings: PopupSettings = {
		event: 'click',
		target: 'priPopup',
		placement: 'top'
	};
	let tagsPopupSettings: PopupSettings = {
		event: 'click',
		target: 'tagsPopup',
		placement: 'top'
	};

	let progress = '🟨🟨🟨';
	import { popup } from '@skeletonlabs/skeleton';

	let status: string = '🔅';
	type StatusObject = {
		[key: string]: string;
	};

	let statusLbls: StatusObject = {
		'🔅': 'New',
		'🚧': 'InProgress',
		'✔️': 'CheckedIn',
		'✅': 'Completed',
		'🚫': 'Cancelled'
	};

	let priority = '🟢';
	type PriorityObject = {
		[key: string]: string;
	};
	let priorityLbls: PriorityObject = {
		'🔴': 'Urgent',
		'🟡': 'Important',
		'🟢': 'Normal'
	};
	let selTag: string = '🎁';
	type TagObject = {
		[key: string]: string;
	};
	const tagLbls: TagObject = {
		'💡': 'ideas',
		'⚠️': 'issues',
		'🔨': 'maintenance',
		'💰': 'finances',
		'🚀': 'innovation',
		'🐞': 'bugs',
		'🎁': 'features',
		'🔒': 'security',
		'🚩': 'attention',
		'📡': 'backend',
		'💾': 'database',
		'🖥️': 'desktop',
		'📱': 'mobile',
		'🌍': 'internationalization',
		'🎨': 'design',
		'📈': 'analytics',
		'🤖': 'automation'
	};
</script>

<div class="px-4 py-1">
	<div
		class="input-group input-group-divider grid-cols-[1fr_auto_auto_auto] rounded-container-token"
	>
		<textarea
			bind:value={topic}
			class="resize-none bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="1"
		/>
		<Sprints />
		<Projects />
		<Team />
	</div>
</div>
<div class="px-4 py-1">
	<div class="input-group input-group-divider rounded-container-token">
		<textarea
			bind:value={description}
			class="resize-none bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="4"
		/>
	</div>
</div>

<div class="px-4 py-1">
	<div class=" rounded-container-token">
		Type: <ItemTypeChoices />

		<span>Progress:</span>
		<span class="chip variant-soft" use:popup={progressSettings}>
			<span>{progress}</span>
		</span>
		<span>Status:</span>

		<span class="chip" use:popup={statusPopupSettings}>
			{status}{statusLbls[status]}
		</span>
		<span>Priority:</span>
		<span class="chip variant-warning" use:popup={priPopupSettings}>
			{priority}
			{priorityLbls[priority]}
		</span>

		<span>Tags:</span>

		<span class="chip" use:popup={tagsPopupSettings}>{selTag}{tagLbls[selTag]}</span>
	</div>
</div>

<div class="card variant-glass-primary p-4" data-popup="prgPopup">
	<!-- Append the arrow element -->
	<ProgressChoices bind:progress />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="statPopup">
	<!-- Append the arrow element -->
	<StatusChoices bind:status />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="tagsPopup">
	<!-- Append the arrow element -->
	<TagsChoices bind:selTag />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="priPopup">
	<!-- Append the arrow element -->
	<PriorityChoices bind:priority />
	<div class="arrow variant-filled-secondary" />
</div>
