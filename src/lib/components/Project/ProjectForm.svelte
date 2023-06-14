<script lang="ts">
	import type { ProjectCreate } from '$lib/types/scrumlog';
	export let project: ProjectCreate;
	export let onSubmit: Function;

	let name = project.name;
	let slug = project.slug;
	let description = project.description;
	let sprintWeeks = project.sprint_weeks ?? 2;
	let sprintAmount = project.sprint_amount ?? 2;
	let sprintCheckupDay = project.sprint_checkup_day ?? 3;
	let repoUrls = project.repo_urls ? project.repo_urls.slice() : [''];
	let startDate = project.start_date ? new Date(project.start_date) : new Date();
	let endDate = project.end_date ? new Date(project.end_date) : new Date();
	const addRepoUrl = (url: string) => {
		repoUrls.push(url);
	};

	const removeRepoUrl = (index: number) => {
		repoUrls.splice(index, 1);
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const formData = {
			...project,
			name,
			description,
			slug,
			labels: [],
			documents: [],
			sprint_weeks: sprintWeeks,
			sprint_amount: sprintAmount,
			sprint_checkup_day: sprintCheckupDay,
			repo_urls: repoUrls.filter((url) => url.trim() !== '')
		};

		onSubmit(formData);
	};
</script>

<form on:submit={handleSubmit}>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="name"> Name </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="name"
			type="text"
			placeholder="Enter name"
			bind:value={name}
			required
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="name"> Slug </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="name"
			type="text"
			placeholder="Enter name"
			bind:value={slug}
			required
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="description"> Description </label>
		<textarea
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="description"
			placeholder="Enter description"
			bind:value={description}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="startDate"> Start Date </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="startDate"
			type="date"
			bind:value={startDate}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="endDate"> End Date </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="endDate"
			type="date"
			bind:value={endDate}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="sprintWeeks"> Sprint Weeks </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sprintWeeks"
			type="number"
			min="1"
			max="4"
			placeholder="Enter sprint weeks"
			bind:value={sprintWeeks}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="sprintAmount"> Sprint Amount </label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sprintAmount"
			type="number"
			min="1"
			max="12"
			placeholder="Enter sprint amount"
			bind:value={sprintAmount}
		/>
	</div>
	<div class="mb-4">
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
			bind:value={sprintCheckupDay}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 font-bold mb-2" for="repoUrls"> Repository URLs </label>
		{#each repoUrls as url, index}
			<div class="flex items-center mb-2">
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Enter repository URL"
					bind:value={repoUrls[index]}
					required
				/>
				{#if index === repoUrls.length - 1}
					<button
						class="ml-2 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-outline"
						type="button"
						on:click={() => {
							addRepoUrl(url);
						}}
					>
						<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M10 18a8 8 0 110-16 8 8 0 010 16zm1-9h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 012 0v3z"
							/>
						</svg>
					</button>
				{/if}
				{#if repoUrls.length > 1}
					<button
						class="ml-2 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline"
						type="button"
						on:click={() => removeRepoUrl(index)}
					>
						<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M10 18a8 8 0 110-16 8 8 0 010 16zm-3.59-8.59a1 1 0 011.41 0L10 11.42l2.59-2.59a1 1 0 011.41 1.41L11.42 13l2.59 2.59a1 1 0 01-1.41 1.41L10 14.42l-2.59 2.59a1 1 0 01-1.41-1.41L8.58 13 5.99 10.41a1 1 0 010-1.42z"
							/>
						</svg>
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
