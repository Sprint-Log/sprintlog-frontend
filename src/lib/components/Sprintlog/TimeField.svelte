<!-- ClickableSpan.svelte -->
<script lang="ts">
	import Time from 'svelte-time';

	export let text: any;
	export let onItemClick: CallableFunction;
	export let color: String;
	export let prefix: String;
	export let typography: String;
	// export let padding: String;
</script>

<span
	class={` px-1 rounded cursor-pointer ${color} ${typography}`}
	on:click={(event) => onItemClick(event, text)}
	on:keydown={(event) => {
		if (event.key === 'Enter') onItemClick(event, text);
	}}
>
	{prefix}
	<Time relative timestamp={text} />
</span>
