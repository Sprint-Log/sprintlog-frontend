<script lang="ts">
	import type { Project } from '$lib/types/scrumlog';

	export let project: Project;
</script>

<a
	class="card bg-initial card-hover overflow-hidden"
	href={`/backlogs/project/${project.slug}/${project.id}`}
>
	<header class="px-2 py-4">
		<h3>{project.name}</h3>
	</header>

	<div class="p-4 space-y-4">
		<article>
			<p>{project.description}</p>
		</article>
	</div>

	<hr class="opacity-50" />

	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<small>Started On {project.start_date}</small>
		</div>
		<div class="flex-auto flex justify-between items-center">
			<small>Due On {project.end_date}</small>
		</div>
	</footer>
</a>
