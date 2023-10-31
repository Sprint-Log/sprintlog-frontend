<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let topic = '';

  let toggleDescription = false;

  const dispatch = createEventDispatcher();

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      dispatch('save');
    }
  }
</script>

<input
  bind:value={topic}
  class="px-1 resize-none bg-transparent ring-1 ring-amber-100 text-sm font-mono w-1/2 top-0"
  name="prompt"
  id="prompt"
  autocomplete="on"
  on:keydown={handleKeyPress}
  on:mouseleave={() => {
    dispatch('mouseleft');
  }}
/>
