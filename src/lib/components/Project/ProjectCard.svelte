<script lang="ts">
	import type { Project } from '$lib/types/sprintlog';
	import { marked } from 'marked';

	export let project: Project;
</script>

<a class="card bg-initial card-hover overflow-hidden" href={`/sprintlogs/project/${project.slug}`}>
	<h3 class="p-4 font-semibold">{project.name}</h3>

	<hr class="opacity-50" />
	<div class="p-4 space-y-4 overflow-auto">
		<article>
			{@html marked(project.description)}
		</article>
	</div>

	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<small>Started On {project.start_date}</small>
		</div>
		<div class="flex-auto flex justify-between items-center">
			<small>Due On {project.end_date}</small>
		</div>
	</footer>
</a>
