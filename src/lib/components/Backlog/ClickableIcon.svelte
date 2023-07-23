<script lang="ts">
	import type { IconSource } from '@steeze-ui/carbon-icons/types';
	export let id: string;
	export let iconSrc: IconSource;
	export let size: string;
	export let onItemClick: CallableFunction;
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<span
	{id}
	class="cursor-pointer"
	on:click={(event) => onItemClick(event, id)}
	on:keydown={(event) => {
		if (event.key === 'Enter') onItemClick(event, id);
	}}
>
	<Icon src={iconSrc} {size} />
</span>
