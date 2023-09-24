<script lang="ts">
	import { createProject } from '$lib/api/sprintlog';
	import type { ProjectCreate } from '$lib/types/sprintlog';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { useQueryClient, createMutation } from '@tanstack/svelte-query';
	import { XMark } from '@steeze-ui/heroicons';
	import { Add } from '@steeze-ui/carbon-icons';
	import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { EditorView, basicSetup } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { onMount } from 'svelte';
	import CMEditor from '../Editors/CMEditor.svelte';



	let project: ProjectCreate = {
		slug: '',
		name: '',
		pin: false,
		description: '',
		documents: [],
		labels: [],
		start_date: new Date().toISOString().split('T')[0],
		end_date: new Date().toISOString().split('T')[0],
		sprint_weeks: 2,
		sprint_amount: 2,
		sprint_checkup_day: 3,
		repo_urls: ['']
	};
	const client = useQueryClient();

	const projectMutation = createMutation(
		async function () {
			return createProject(project);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-project']);
				modalStore.close();
			},
			onError: function (err) {
				toastStore.trigger({ message: 'Something went wrong', background: 'variant-filled-error' });
			}
		}
	);
</script>

<Toast />
<form
	on:submit={(e) => {
		e.preventDefault();
		$projectMutation.mutate();
	}}
	class="card bg-surface-100 p-6 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]"
>
	<h2>Create a Project</h2>
	<div class="grid grid-cols-2 gap-4">
		<label class="label">
			<span>Name</span>
			<input
				class="input variant-form-material"
				type="text"
				placeholder="Enter Name"
				bind:value={project.name}
			/>
		</label>
		<label class="label">
			<span>Slug</span>
			<input
				class="input variant-form-material"
				type="text"
				placeholder="Enter Slug"
				bind:value={project.slug}
			/>
		</label>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<label class="label">
			<span>Start Date</span>
			<input class="input variant-form-material" type="date" bind:value={project.start_date} />
		</label>
		<label class="label">
			<span>End Date</span>
			<input class="input variant-form-material" type="date" bind:value={project.end_date} />
		</label>
	</div>

	<div class="grid grid-cols-3 gap-4">
		<label class="label">
			<span>Sprint Weeks</span>
			<input
				class="input variant-form-material"
				type="number"
				placeholder="Enter Sprint Weeks"
				bind:value={project.sprint_weeks}
			/>
		</label>
		<label class="label">
			<span>Sprint Amount</span>
			<input
				class="input variant-form-material"
				type="number"
				placeholder="Enter Sprint Amount"
				bind:value={project.sprint_amount}
			/>
		</label>
		<label class="label">
			<span>Sprint Checkup Day</span>
			<input
				class="input variant-form-material"
				type="number"
				placeholder="Enter Sprint Checkup day"
				bind:value={project.sprint_checkup_day}
			/>
		</label>
	</div>
	<label class="label">
		<span>Repository URLs</span>
		<div class="grid grid-cols-2 gap-4">
			{#each project.repo_urls as url, i}
				<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
					<input type="text" placeholder="Enter URL" bind:value={url} />
					<button
						class="variant-filled-error btn-icon rounded-none"
						type="button"
						on:click={() => {
							const urls = project.repo_urls;
							project.repo_urls = [...urls.slice(0, i), ...urls.slice(i + 1)];
						}}
					>
						<Icon src={XMark} />
					</button>
				</div>
			{/each}
			<button
				on:click={() => (project.repo_urls = [...project.repo_urls, ''])}
				type="button"
				class="btn variant-outline-surface"><Icon src={Add} size="20" /></button
			>
		</div>
	</label>
    <CMEditor bind:description={project.description} on:save={() =>$projectMutation.mutate()} />
	<div class="text-right pt-4">
		<button class="btn variant-filled-primary" type="submit"> Create </button>
	</div>
</form>
