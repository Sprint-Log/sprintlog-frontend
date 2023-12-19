<script lang="ts">
  import type { IconSource } from '@steeze-ui/carbon-icons/types';
  export let id: string;
  export let iconSrc: IconSource;
  export let size: string = '22px';
  export let onItemClick: CallableFunction;
  export let color: string = '';
  import { Icon } from '@steeze-ui/svelte-icon';
</script>

<span
  {id}
  class=" cursor-pointer select-none"
  on:click={(event) => onItemClick(event, id)}
  on:keydown={(event) => {
    if (event.key === 'Enter') onItemClick(event, id);
  }}
>
  <Icon src={iconSrc} {size} class={color} />
</span>
