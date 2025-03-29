<script lang="ts">
	import type { Project } from '$lib/types/sprintlog';
	import { marked } from 'marked';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { TrashCan } from '@steeze-ui/carbon-icons';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let project: Project;
</script>

<a class="card bg-initial card-hover overflow-hidden" href={`/sprintlogs/project/${project.slug}`}>
	
	<div class="flex justify-between p-5">
		<h3 class="font-semibold">{project.name}</h3>
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
