<script lang="ts">
	import { createProject } from '$lib/api/sprintlog';
	import type { ProjectCreate } from '$lib/types/sprintlog';
	let project: ProjectCreate = {
		slug: 'my-project',
		name: 'My Project',
		pin: false,
		description: 'This is my project',
		documents: [],
		labels: [],
		start_date: new Date(),
		end_date: new Date(),
		sprint_weeks: 2,
		sprint_amount: 5,
		sprint_checkup_day: 7,
		repo_urls: ['https://github.com/my-project']
	};
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	const client = useQueryClient();

	const projectMutation = createMutation(
		async function () {
			return createProject(project);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-project']);
			}
		}
	);
</script>

<form
	on:submit={(e) => {
		e.preventDefault();
		$projectMutation.mutate();
	}}
	class="card bg-surface-500 shadow-md rounded px-2 pt-1 pb-1 overflow-scroll flex flex-col space-y-4"
>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="name"> Name </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="name"
			type="text"
			placeholder="Enter name"
			bind:value={project.name}
			required
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="name"> Slug </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="name"
			type="text"
			placeholder="Enter name"
			bind:value={project.slug}
			required
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="description"> Description </label>
		<textarea
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="description"
			placeholder="Enter description"
			bind:value={project.description}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="startDate"> Start Date </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="startDate"
			type="date"
			bind:value={project.start_date}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="endDate"> End Date </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="endDate"
			type="date"
			bind:value={project.end_date}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="sprintWeeks"> Sprint Weeks </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sprintWeeks"
			type="number"
			min="1"
			max="4"
			placeholder="Enter sprint weeks"
			bind:value={project.sprint_weeks}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="sprintAmount"> Sprint Amount </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sprintAmount"
			type="number"
			min="1"
			max="12"
			placeholder="Enter sprint amount"
			bind:value={project.sprint_amount}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="sprintCheckupDay">
			Sprint Checkup Day
		</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sprintCheckupDay"
			type="number"
			min="1"
			max="7"
			placeholder="Enter sprint checkup day"
			bind:value={project.sprint_checkup_day}
		/>
	</div>
	<div class="mb-1">
		<label class="block text-gray-700 font-bold mb-2" for="repoUrls"> Repository URLs </label>
		{#each project.repo_urls as url, index}
			<div class="flex items-center mb-2">
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Enter repository URL"
					bind:value={project.repo_urls[index]}
					required
				/>
				{#if index === project.repo_urls.length - 1}
					<button
						class="ml-2 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-outline"
						type="button"
						on:click={() => {
							project.repo_urls.push(url);
						}}
					>
						+
					</button>
				{/if}
				{#if project.repo_urls.length > 1}
					<button
						class="ml-2 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline"
						type="button"
						on:click={() => project.repo_urls.splice(index)}
					>
						-
					</button>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex items-center justify-between">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="submit"
		>
			Save
		</button>
	</div>
</form>
