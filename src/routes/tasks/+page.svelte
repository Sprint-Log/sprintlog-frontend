<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import FloatingTask from '$lib/components/floatingTask/floatingTask.svelte';
	import List from '$lib/components/list.svelte';
	import ListBox from '$lib/components/list/listbox.svelte';
	import Listitem from '$lib/components/list/listitem.svelte';
	let topic = '';
	let description = '';
</script>

<!-- Unscrollable parts -->
<!-- <div class="h-32"> -->
<!-- Content -->
<!-- </div> -->

<!-- Scrollable container -->
<div class="grid grid-rows-[2fr_auto] h-full">
	<ListBox>
		<span slot="title">Sprint Items</span>
		<a href="#" class="text-sm font-medium" slot="action"> View all </a>
		<div class="h-[50vh] overflow-y-scroll">
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
		<div class="h-[25vh] overflow-y-scroll">
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
	<FloatingTask />
</div>
