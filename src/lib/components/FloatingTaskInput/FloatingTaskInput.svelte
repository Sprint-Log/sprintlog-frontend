<script lang="ts">
	import OptionalPopup from './OptionalPopup.svelte';
	import OptionalRow from './OptionalRow.svelte';
	import Sprints from './Sprints.svelte';
	import Progress from './ProgressChoices.svelte';
	import Priority from './PriorityChoices.svelte';
	import Statuses from './StatusChoices.svelte';
	import ItemType from './ItemTypeChoices.svelte';
	import Tags from './TagsChoices.svelte';
	import Projects from './Projects.svelte';
	import Team from './Team.svelte';
	let topic = '';
	let description = '';
</script>

<div class="px-4 py-1">
	<div
		class="input-group input-group-divider grid-cols-[1fr_auto_auto_auto] rounded-container-token"
	>
		<textarea
			bind:value={topic}
			class="resize-none bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="1"
		/>
		<Sprints />
		<Projects />
		<Team />
	</div>
</div>
<div class="px-4 py-1">
	<div class="input-group input-group-divider rounded-container-token">
		<textarea
			bind:value={description}
			class="resize-none bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="4"
		/>
	</div>
</div>

<div class="px-4 py-1">
	<OptionalRow />
</div>

<div class="card variant-glass-primary p-4" data-popup="optionalPopup">
	<!-- Append the arrow element -->
	<OptionalPopup />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="typPopup">
	<!-- Append the arrow element -->
	<ItemType />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="prgPopup">
	<!-- Append the arrow element -->
	<Progress />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="statPopup">
	<!-- Append the arrow element -->
	<Statuses />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="tagsPopup">
	<!-- Append the arrow element -->
	<Tags />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="priPopup">
	<!-- Append the arrow element -->
	<Priority />
	<div class="arrow variant-filled-secondary" />
</div>
<div class="card variant-glass-primary p-4" data-popup="optionalPopup">
	<!-- Append the arrow element -->
	<Tags />
	<div class="arrow variant-filled-secondary" />
</div>
