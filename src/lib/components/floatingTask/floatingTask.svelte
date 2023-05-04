<script>
	import Sprints from './Sprints.svelte';

	import Projects from './Projects.svelte';
	import Team from './Team.svelte';

	let topic = '';
	let description = '';
	import Progress from './Progress.svelte';
	import Priority from './Priority.svelte';
	import Statuses from './Status.svelte';
	import ItemType from './ItemType.svelte';
	import Tags from './Tags.svelte';
</script>

<div class="sticky bottom-0 grid grid-rows-[auto_auto_auto]">
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
		<div class="grid-cols-4 rounded-container-token">
			<ItemType />
			<Progress />
			<Statuses />
			<Priority />
			<Tags />
		</div>
	</div>
</div>
