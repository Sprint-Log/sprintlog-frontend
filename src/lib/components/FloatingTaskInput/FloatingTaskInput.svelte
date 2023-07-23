<script lang="ts">
	import Sprints from './Sprints.svelte';
	import Projects from './Projects.svelte';
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	import Team from './Team.svelte';
	import {
		StatusEnum,
		PriorityEnum,
		TagEnum,
		ProgressEnum,
		type Sprintlog,
		type SprintlogCreate as SprintlogCreate
	} from '$lib/types/sprintlog';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { User } from '$lib/types/sprintlog';

	import ItemTypeChoices from './ItemTypeChoices.svelte';
	import StatusChoices from './StatusChoices.svelte';
	import SprintChoices from './SprintChoices.svelte';
	import TagsChoices from './TagsChoices.svelte';
	import PriorityChoices from './PriorityChoices.svelte';
	import ProgressChoices from './ProgressChoices.svelte';
	import { Add, FetchUpload, SendAlt } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createSprintlog, getBacklogByPrjSlug } from '$lib/api/sprintlog';
	import ItemType from './ItemType.svelte';
	import EffortChoices from './EffortChoices.svelte';
	import Milkdown from '../Editors/TipTap.svelte';
	import TipTap from '../Editors/TipTap.svelte';
	let topic = '';
	let description = '';
	export let sprintSettings: PopupSettings = { event: 'click', target: 'sprintPopup' };
	export let effortSettings: PopupSettings = { event: 'click', target: 'effortPopup' };
	export let statusSettings: PopupSettings = { event: 'click', target: 'statPopup' };
	export let teamMenuSettings: PopupSettings = { event: 'click', target: 'teamPopup' };
	export let priPopupSettings: PopupSettings = { event: 'click', target: 'priPopup' };
	export let tagsPopupSettings: PopupSettings = { event: 'click', target: 'tagsPopup' };
	export let progressSettings: PopupSettings = {
		event: 'click',
		target: 'prgPopup',
		placement: 'top'
	};
	export let project_slug: string;
	export let progress: ProgressEnum = ProgressEnum.empty;
	export let status: StatusEnum = StatusEnum.new;
	export let priority: PriorityEnum = PriorityEnum.med;
	export let selTag: TagEnum = TagEnum.features;
	export let itemTyp: string = 'backlog';
	export let sprint = 1;
	export let estDays = 1;
	export let owner_id: string;

	let assignee: User;
	let assignee_id: string;
	let labels: string[] = [];
	let client = useQueryClient();
	let isFocused: boolean = true;
	let toggleDescription = false;
	const addMutation = createMutation(
		async function () {
			const sprintlog: SprintlogCreate = {
				title: topic,
				description: description,
				progress: progress,
				sprint_number: sprint,
				priority: priority,
				status: status,
				labels: labels,
				type: itemTyp,
				category: selTag,
				est_days: estDays,
				beg_date: new Date().toISOString().substring(0, 10),
				assignee_id: assignee.id,
				owner_id: owner_id,
				project_slug: project_slug
			};
			return createSprintlog(sprintlog);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
</script>

<div class="input-group gap-0 auto-cols-auto flex rounded-container-token">
	<div class="chip relative" use:popup={sprintSettings}>
		<span class="badge-icon absolute -top-0 -right-0 z-10">{sprint}</span>
		⚡
	</div>
	<div class="chip relative" use:popup={effortSettings}>
		<span class="badge-icon absolute -top-0 -right-0 z-10">{estDays}</span>
		⏰
	</div>
	<span class="chip" use:popup={progressSettings}>
		<span>{progress}</span>
	</span>

	<span class="chip" use:popup={statusSettings}>
		{status}
	</span>

	<span class="chip variant-warning" use:popup={priPopupSettings}>
		{priority}
	</span>
	<span
		class="chip variant-warning"
		on:keydown={() => (toggleDescription = !toggleDescription)}
		on:click={() => (toggleDescription = !toggleDescription)}
	>
		<Icon src={Add} size="20" />
	</span>

	<span class="chip" use:popup={tagsPopupSettings}>
		{selTag}
	</span>
	<div class="chip relative font-bold" use:popup={teamMenuSettings}>@ {assignee?.name}</div>

	<textarea
		bind:value={topic}
		class="input resize-none bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Add Backlog or Task topic..."
		rows="1"
	/>
	<button
		class="btn btn-sm variant-ghost-secondary"
		on:click={(e) => {
			$addMutation.mutate();
		}}
	>
		<span><Icon src={SendAlt} size="20" /></span>
	</button>
</div>
<!-- <div class="input h-20 max-h-30"> -->
<!-- </div> -->
{#if toggleDescription}
	<div
		class="w-full flex flex-col pt-1 my-1 pb-1 h-[100px] max-h-[200px] variant-filled-surface rounded px-1 overflow-y-auto overflow-x-hidden"
	>
		<TipTap {description} />
	</div>
{/if}

<!-- hidden containers for popup -->

<div class="card p-4" data-popup="prgPopup">
	<!-- Append the arrow element -->
	<ProgressChoices bind:progress />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="statPopup">
	<!-- Append the arrow element -->
	<StatusChoices bind:status />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="sprintPopup">
	<!-- Append the arrow element -->
	<SprintChoices bind:sprint />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="effortPopup">
	<!-- Append the arrow element -->
	<EffortChoices bind:estDays />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="tagsPopup">
	<!-- Append the arrow element -->
	<TagsChoices bind:selTag />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="priPopup">
	<!-- Append the arrow element -->
	<PriorityChoices bind:priority />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="priPopup">
	<!-- Append the arrow element -->
	<PriorityChoices bind:priority />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="teamPopup">
	<!-- Append the arrow element -->
	<Team bind:assignee />
	<div class="arrow variant-filled-secondary" />
</div>

<!-- 
<div class="py-1">
	<div class="flex justify-start items-center space-x-1">
		Type: <ItemTypeChoices bind:itemTyp />

		<span>Progress:</span>
		<span class="chip variant-soft" use:popup={progressSettings}>
			<span>{progress}</span>
		</span>

		<span>Status:</span>
		<span class="chip" use:popup={statusSettings}>
			{status}
		</span>

		<span>Priority:</span>
		<span class="chip variant-warning" use:popup={priPopupSettings}>
			{priority}
		</span>

		<span>Tags:</span>
		<span class="chip" use:popup={tagsPopupSettings}>
			{selTag}
		</span>
		<Sprints bind:sprint />
		<Team bind:assignee_id />
		<button
			class="btn btn-sm variant-ghost-secondary"
			on:click={(e) => {
				$addMutation.mutate();
			}}
		>
			<span><Icon src={FetchUpload} size="18" /></span>
			<span>Submit</span>
		</button>
	</div>
</div> -->
