<script lang="ts">
  import { StatusEnum } from '$lib/types/scrumlog';

  export let status: StatusEnum = StatusEnum.new;

  function setStatus(newStatus: StatusEnum) {
    status = newStatus;
  }
</script>

<span class="hidden md:visible">Status:</span>
{#each Object.values(StatusEnum) as stat}
  <span
    class="chip {status === stat ? 'variant-filled-success' : 'variant-soft'}"
    on:click={() => {
      setStatus(stat);
    }}
    on:keypress
  >
    <span>{stat}</span>
  </span>
{/each}