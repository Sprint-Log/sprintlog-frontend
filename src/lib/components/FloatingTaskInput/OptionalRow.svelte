<script lang="ts">
	import Sprints from './Sprints.svelte';

	import Projects from './Projects.svelte';
	import Team from './Team.svelte';

	let topic = '';
	let description = '';
	import Progress from './Progress.svelte';
	import Priority from './Priority.svelte';
	import Statuses from './Status.svelte';
	import Tags from './Tags.svelte';
	import EditAll from './EditAll.svelte';
	import ItemTypeChoices from './ItemTypeChoices.svelte';
</script>

<div class=" rounded-container-token">
	Type: <ItemTypeChoices />
	<Progress />
	<Statuses />
	<Priority />
	<Tags />
	<!-- <EditAll /> -->
</div>
