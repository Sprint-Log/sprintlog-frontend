<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let topic = "";

  let toggleDescription = false;

  const dispatch = createEventDispatcher();


  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      dispatch("save");
    }
  }
</script>

<input
  bind:value={topic}
  class="resize-none bg-transparent ring-2 ring-amber-100 text-sm font-mono flex-1 mx-20"
  name="prompt"
  id="prompt"
  placeholder="Add A Backlog Item..."
  autocomplete="on"
  on:keydown={handleKeyPress}
/>