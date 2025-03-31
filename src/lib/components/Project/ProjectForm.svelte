<script lang="ts">
	import { createProject, updateProject } from '$lib/api/sprintlog';
	import type { ProjectCreate } from '$lib/types/sprintlog';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';
	import { useQueryClient, createMutation } from '@tanstack/svelte-query';
	import { Add } from '@steeze-ui/carbon-icons';
	import { Toast, modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { PROJECTS_QUERY_KEY } from '$lib/constants';
	import { ProjectStatus } from '$lib/types/sprintlog';

	let is_update = false;
	
	let projectId = "";

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

	if ($modalStore[0].meta) {
		project = $modalStore[0].meta.project;
		is_update = true;
		projectId = $modalStore[0].meta.project_id;
	}

	$: project.slug = project.name.trim().toLowerCase().replace(/\s+/g, '_');
	const client = useQueryClient();

	const projectMutation = createMutation(
		{
			mutationFn: async() => (is_update ? updateProject(project, projectId) : createProject(project)),
			onSuccess: function (data) {
				client.setQueriesData([PROJECTS_QUERY_KEY, data.id], data);
				client.invalidateQueries({ queryKey:[PROJECTS_QUERY_KEY]});
				modalStore.close();
			},
			onError: function (err: Error) {
				let errorMessage = err.message;
				toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
			}
		}
	);
	function onProjectCreate() {
		const regex = /^[A-Za-z0-9 ]+$/;
		if (!regex.test(project.name)) {
			toastStore.trigger({message: "Project name cannot contain special characters.", background: "variant-filled-error"});
		}
		else {
			$projectMutation.mutate();
		}
	}
</script>

<Toast />
<form
	on:submit|preventDefault={onProjectCreate}
	class="card bg-surface-100 p-6 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[46rem]"
>
	<h2>{is_update ? "Update Project" : "Create Project"}</h2>
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
				placeholder="Slug"
				bind:value={project.slug}
				readonly
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

	<div class="grid grid-cols-2 gap-4">
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
	</div>
	<div class="grid grid-cols-2 gap-4">
		<label class="label">
			<span>Sprint Checkup Day</span>
			<input
				class="input variant-form-material"
				type="number"
				placeholder="Enter Sprint Checkup day"
				bind:value={project.sprint_checkup_day}
			/>
		</label>
		<label class="label">
			<span>Project Status</span>
			<select
				bind:value={project.status}
				class="input variant-form-material h-10 w-full text-xs"
			>
				{#each Object.values(ProjectStatus) as status}
					<option value={status}>{status.replaceAll("_", " ").toUpperCase()}</option>
				{/each}
			</select>
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
    <!-- <CMEditor 
	bind:description={project.description} 
	on:save={(event) => {
		project.description = event.detail.text;
		$projectMutation.mutate()
		}} /> -->
	<label class="label">
		<span>Project Description</span>
		<textarea
			class="input variant-form-material"
			placeholder="Enter Description"
			bind:value={project.description}
		/>
	</label>
	<div class="text-right pt-4">
		<button class="btn variant-filled-primary" type="submit"> {is_update ? "Update" : "Create"}</button>
	</div>
</form>
