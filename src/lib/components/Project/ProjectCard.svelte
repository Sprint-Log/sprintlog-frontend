<script lang="ts">
	import type { Project } from '$lib/types/sprintlog';
	import { marked } from 'marked';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Edit } from '@steeze-ui/carbon-icons';
	import { TrashCan } from '@steeze-ui/carbon-icons';
	import { createEventDispatcher } from 'svelte';
	import type { ProjectStatus } from '$lib/types/sprintlog';

	const dispatch = createEventDispatcher();

	const statusColorMap: Record<ProjectStatus, string> = {
		not_started: "text-gray-600 bg-gray-400",
		active: "text-green-600 bg-green-400",
		completed: "text-blue-600 bg-blue-400",
		on_hold: "text-yellow-600 bg-yellow-400",
		cancelled: "text-red-600 bg-red-400"
	}

	export let project: Project;
</script>

<a class="card bg-initial card-hover overflow-hidden" href={`/sprintlogs/project/${project.slug}`}>
	
	<div class="flex justify-between p-5">
		<div>
			<div
			class="rounded-sm flex justify-center items-center ${statusColorMap[project.status]} text-surface-800 text-sm px-2 py-3 h-4 mb-2 w-fit "
			>
			{project.status.replace("_", " ").toUpperCase()}
			</div>
			<h3 class="font-semibold">{project.name}</h3>
		</div>
		
		<div class="flex justify-around gap-3">
			<button
				class="btn-icon hover:variant-soft w-5"
				on:click={(event) => {
					event.stopPropagation();
					event.preventDefault();
					dispatch('update', { project: project });
				}}>
				<Icon src={Edit}/>
			</button>
			<button
				class="btn-icon hover:variant-soft w-5"
				on:click={(event) => {
					event.stopPropagation();
					event.preventDefault();
					dispatch('delete', { id: project.id.toString() });
				}}>
				<Icon src={TrashCan}/>
			</button>
		</div>
		
	</div>

	<hr class="opacity-50" />
	<div class="p-4 space-y-4 overflow-auto">
		<article>
			{@html marked(project.description)}
		</article>
	</div>

	<footer class="p-4 flex justify-start items-center ">
		<div class="flex-auto flex justify-between items-center">
			<small>Started On {project.start_date}</small>
		</div>
		<div class="flex-auto flex justify-between items-center">
			<small>Due On {project.end_date}</small>
		</div>
	</footer>
</a>
