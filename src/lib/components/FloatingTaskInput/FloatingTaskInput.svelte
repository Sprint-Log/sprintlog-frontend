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
		type Backlog,
		type BacklogCreate
	} from '$lib/types/sprintlog';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import ItemTypeChoices from './ItemTypeChoices.svelte';
	import StatusChoices from './StatusChoices.svelte';
	import TagsChoices from './TagsChoices.svelte';
	import PriorityChoices from './PriorityChoices.svelte';
	import ProgressChoices from './ProgressChoices.svelte';
	import { FetchUpload } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createBacklog, getBacklogByPrjSlug } from '$lib/api/sprintlog';
	import ItemType from './ItemType.svelte';
	let topic = '';
	let description = '';
	export let statusSettings: PopupSettings = { event: 'click', target: 'statPopup' };
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
	export let sprint: string = '1';
	export let owner_id: string;
	let assignee_id: string;
	let labels: string[] = [];
	let client = useQueryClient();
	const addMutation = createMutation(
		async function () {
			const backlog: BacklogCreate = {
				title: topic,
				description: description,
				progress: progress,
				sprint_number: parseInt(sprint),
				priority: priority,
				status: status,
				labels: labels,
				type: itemTyp,
				category: selTag,
				est_days: 3,
				beg_date: new Date().toISOString().substring(0, 10),
				assignee_id: assignee_id,
				owner_id: owner_id,
				project_slug: project_slug
			};
			return createBacklog(backlog);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
</script>

<div class="px-4 py-1">
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
</div>
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
		<Sprints bind:sprint />
		<Team bind:assignee_id />
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
