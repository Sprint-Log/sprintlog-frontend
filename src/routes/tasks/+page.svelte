<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import FloatingTask from '$lib/components/FloatingTaskInput/FloatingTaskInput.svelte';
	import List from '$lib/components/TaskList/list.svelte';
	import ListBox from '$lib/components/TaskList/listbox.svelte';
	import Listitem from '$lib/components/TaskList/listitem.svelte';
	let topic = '';
	let description = '';
</script>

<!-- Unscrollable parts -->
<!-- <div class="h-32"> -->
<!-- Content -->
<!-- </div> -->

<!-- Scrollable container -->
<div class="grid grid-rows-[auto,1fr]">
	<ListBox>
		<span slot="title">Sprint Items</span>
		<a href="#" class="text-sm font-medium" slot="action"> View all </a>
		<div class="max-h-[40vh] overflow-y-scroll">
			<List>
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
			</List>
		</div>
	</ListBox>
	<ListBox>
		<span slot="title">Backlog Items</span>
		<a href="#" class="text-sm font-medium" slot="action"> View all </a>
		<div class="overflow-y-scroll max-h-[35vh]">
			<List>
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
				<Listitem />
			</List>
		</div>
	</ListBox>
</div>
<div class="sticky bottom-0 grid grid-rows-[auto_auto_auto]">
	<FloatingTask />
</div>
