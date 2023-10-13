<script lang="ts">
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	import Team from './Team.svelte';
	import {
		StatusEnum,
		PriorityEnum,
		TagEnum,
		ProgressEnum,
		type SprintlogCreate as SprintlogCreate
	} from '$lib/types/sprintlog';
	import { modeCurrent, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { codeMirrorSetup } from './CodeMirrorConfig';
	let sprintSettings: PopupSettings = { event: 'click', target: 'sprintPopup' };
	let effortSettings: PopupSettings = { event: 'click', target: 'effortPopup' };
	let statusSettings: PopupSettings = { event: 'click', target: 'statPopup' };
	let teamMenuSettings: PopupSettings = { event: 'click', target: 'teamPopup' };
	let priPopupSettings: PopupSettings = { event: 'click', target: 'priPopup' };
	let tagsPopupSettings: PopupSettings = { event: 'click', target: 'tagsPopup' };
	let progressSettings: PopupSettings = {
		event: 'click',
		target: 'prgPopup',
		placement: 'top'
	};
	import type { Sprintlog, User } from '$lib/types/sprintlog';
	import StatusChoices from './StatusChoices.svelte';
	import SprintChoices from './SprintChoices.svelte';
	import TagsChoices from './TagsChoices.svelte';
	import PriorityChoices from './PriorityChoices.svelte';
	import ProgressChoices from './ProgressChoices.svelte';
	import { Add, AddAlt, SendAlt, Subtract, SubtractAlt } from '@steeze-ui/carbon-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createSprintlog, updateSprintlog } from '$lib/api/sprintlog';
	import EffortChoices from './EffortChoices.svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { onMount } from 'svelte';
	import { Compartment } from '@codemirror/state';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { basicLight } from 'cm6-theme-basic-light';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let item: Sprintlog | undefined;
	export let project_slug = '';
	export let user: User | undefined;

	let editor: HTMLDivElement;
	let view: EditorView;

	const theme = new Compartment();

	onMount(() => {
		view = new EditorView({
			extensions: [codeMirrorSetup, theme.of(basicLight), markdown()],
			parent: editor
		});
		view.contentDOM.addEventListener('blur', (event) => {
			toggleDescription = false;
		});
		return () => {
			view.destroy();
		};
	});

	$: {
		view?.dispatch({
			effects: theme.reconfigure($modeCurrent ? basicLight : oneDark)
		});
	}

	let {
		title: topic = '',
		description = '',
		sprint_number: sprint = 1,
		est_days: estDays = 3,
		owner_id = user?.id,
		labels = [],
		progress = ProgressEnum.empty,
		priority = PriorityEnum.med,
		status = StatusEnum.new,
		category = TagEnum.features,
		type: itemTyp = 'backlog'
	} = item || {};

	let toggleDescription = false;
	let client = useQueryClient();

	const postMutation = createMutation(
		async function () {
			if (item?.slug) {
				// Update operation
				// Perform your update operation logic here
				// For example:
				return updateSprintlog(item);
			} else {
				// Create operation
				const sprintlog: SprintlogCreate = {
					title: topic,
					description: description,
					progress: progress,
					sprint_number: sprint,
					priority: priority,
					status: status,
					labels: labels,
					type: itemTyp,
					category: category,
					est_days: estDays,
					beg_date: new Date().toISOString().substring(0, 10),
					assignee_id: user?.id || '',
					owner_id: owner_id,
					project_slug: project_slug
				};
				return createSprintlog(sprintlog);
			}
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
				topic = '';
				reset();
				dispatch('completion');
			}
		}
	);
	function reset() {
		view.dispatch({
			changes: { from: 0, to: view.state.doc.toString().length, insert: '' }
		});
	}

	// ...
</script>

<div class="input-group gap-0 auto-cols-auto flex rounded-container-token">
	<span class="chip px-1 font-mono font-bold">
		[{project_slug}-S{sprint}-####]
	</span>
	<span class="chip px-1" use:popup={statusSettings}>
		{status}
	</span>
	<span class="chip px-1" use:popup={tagsPopupSettings}>
		{category}
	</span>
	<span class="chip px-1 variant-warning" use:popup={priPopupSettings}>
		{priority}
	</span>
	<span class="chip px-1" use:popup={progressSettings}>
		<span>{progress}</span>
	</span>
	<div class="chip px-1 relative" use:popup={sprintSettings}>
		<span class="badge-icon absolute -top-0 -right-0 z-10">{sprint}</span>
		⚡
	</div>
	<div class="chip px-1 relative" use:popup={effortSettings}>
		<span class="badge-icon absolute -top-0 -right-0 z-10">{estDays}</span>
		⏰
	</div>
	<div class="chip px-1 relative font-bold" use:popup={teamMenuSettings}>@ {user?.name}</div>
	<input
		bind:value={topic}
		class="input resize-none bg-transparent border-0 ring-0 px-4 py-1 outline-0"
		name="prompt"
		id="prompt"
		placeholder="Add A Backlog Item..."
		autocomplete="off"
		on:focus={() => {
			// toggleDescription = true;
		}}
	/>
	<!-- <div class="w-full" /> -->

	<span
		class="chip px-1 variant-warning"
		on:keydown={() => (toggleDescription = !toggleDescription)}
		on:click={() => (toggleDescription = !toggleDescription)}
	>
		{#if !toggleDescription}
			<Icon src={AddAlt} size="20" />
		{:else}
			<Icon src={SubtractAlt} size="20" />
		{/if}
	</span>
	<button
		class="btn btn-sm variant-ghost-secondary"
		on:click={(e) => {
			description = view.state.doc.toString();
			$postMutation.mutate();
		}}
		disabled={$postMutation.isLoading}
	>
		<span><Icon src={SendAlt} size="20" /></span>
	</button>
</div>
<div
	bind:this={editor}
	class:hidden={!toggleDescription}
	class="min-h-[10rem] max-h-80 rounded-container-token overflow-y-scroll py-1 px-2"
/>
<div class="card p-4" data-popup="prgPopup">
	<ProgressChoices bind:progress />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="statPopup">
	<StatusChoices bind:status />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="sprintPopup">
	<SprintChoices bind:sprint />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="effortPopup">
	<EffortChoices bind:estDays />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4 max-h-96 overflow-y-scroll" data-popup="tagsPopup">
	<TagsChoices bind:selTag={category} />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="priPopup">
	<PriorityChoices bind:priority />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card p-4" data-popup="teamPopup">
	<Team bind:assignee={user} />
	<div class="arrow variant-filled-secondary" />
</div>
