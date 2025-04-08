<!-- ClickableSpan.svelte -->
<script lang="ts">
  export let text: any;
  export let onItemClick: CallableFunction;
  export let color: String;
  export let typography: String;
  // export let padding: String;
  export let isEditable: Boolean;
</script>

<span
  class={`px-1 rounded cursor-pointer ${color} ${typography}`}
  on:click={(event) => {
    event.stopPropagation();
    if (!isEditable) {
      return;
    }
    onItemClick(event, text);
  }}
  on:keydown={(event) => {
    if (event.key === 'Enter') onItemClick(event, text);
  }}
>
  {text}
</span>
