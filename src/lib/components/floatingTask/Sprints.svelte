<script>
	import Projects from './Projects.svelte';

	let topic = '';
	let description = '';
	import Progress from './Progress.svelte';
	import Priority from './Priority.svelte';
	import Statuses from './Status.svelte';
	import ItemType from './ItemType.svelte';
</script>

<select class="select">
	<option value="1">Sprint 1</option>
	<option value="2">Sprint 2</option>
	<option value="3">Sprint 3</option>
	<option value="4">Sprint 4</option>
	<option value="5">Sprint 5</option>
</select>
