<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import List from '$lib/components/Backlog/list.svelte';
	import ListBox from '$lib/components/Backlog/listbox.svelte';
	import Listitem from '$lib/components/Backlog/listitem.svelte';
	import {
		type Backlog,
		PriorityEnum,
		ProgressEnum,
		StatusEnum,
		TagEnum
	} from '../../lib/types/backlog';

	let bl: Backlog = {
		id: '123',
		title: 'Update user profile page',
		priority: PriorityEnum.hi,
		category: TagEnum.features,
		assignee: 'jane@example.com',
		estimated_time: new Date('2022-01-01'),
		created: new Date('2022-01-01'),
		updated: new Date('2022-01-01'),
		due_date: new Date('2022-01-15'),
		start_date: new Date('2022-01-01'),
		sprint: 1,
		progress: ProgressEnum.empty,
		description: 'Update user profile page to include new fields and data.',
		project: {
			slug: 'my-project',
			name: 'My Project',
			description: 'A project to build a new web application for our company.',
			start_date: new Date('2021-01-01'),
			end_date: new Date('2022-12-31')
		},
		status: StatusEnum.started
	};
</script>

<!-- Unscrollable parts -->
<!-- <div class="h-32"> -->
<!-- Content -->
<!-- </div> -->

<!-- Scrollable container -->
<div class="grid min-h-[calc(100vh-1.8rem)] grid-rows-[auto,auto]">
	<ListBox>
		<span slot="title">Sprint Items</span>
		<a href="#" class="text-sm font-medium" slot="action"> View all </a>
		<div class=" overflow-y-scroll">
			<List>
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
			</List>
		</div>
	</ListBox>
</div>
<div
	class="sticky bottom-0 grid grid-rows-[auto_auto_auto] variant-ringed variant-glass-surface pt-2 mx-1 rounded-[10px]"
>
	<ListBox>
		<span slot="title">Backlog Items</span>
		<a href="#" class="text-sm font-medium" slot="action"> View all </a>
		<div class="h-[240px] overflow-y-scroll">
			<List>
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
				<Listitem bind:backlog={bl} />
			</List>
		</div>
	</ListBox>
	<FloatingTask />
</div>
