<script lang="ts">
	import Sprints from './Sprints.svelte';

	import Projects from './Projects.svelte';
	import Team from './Members.svelte';

	let topic = '';
	let description = '';
	import Progress from './ProgressChoices.svelte';
	import Priority from './PriorityChoices.svelte';
	import Statuses from './StatusChoices.svelte';
	import ItemType from './ItemTypeChoices.svelte';
	import Tags from './TagsChoices.svelte';
</script>

<ItemType />
<Progress />
<Statuses />
<Priority />
<Tags />
