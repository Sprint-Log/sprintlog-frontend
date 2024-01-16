<!-- Pagination.svelte -->
<script lang="ts">
  import { generatePageNumbers } from '$lib/utils/getPageNum';
  export let pageNum: number;
  export let totalPages: number;
  export let setPage: (newPage: number) => void;

  let middlePageNumbers: number[];

  $: {
    middlePageNumbers = generatePageNumbers(pageNum, totalPages);
  }
</script>

<nav
  class="card bg-initial card-hover inline-flex -space-x-px rounded-lg shadow-sm"
  aria-label="Pagination"
>
  <button
    class="!no-underline hover:!underline !text-surface-900-50-token text-sm relative inline-flex items-center rounded-l-md px-2 py-2 border-r border-surface-500"
    on:click={() => setPage(Math.max(pageNum - 1, 0))}
    disabled={pageNum === 0}
  >
    Previous
  </button>

  {#each middlePageNumbers as page (page)}
    <button
      class={`!no-underline hover:!underline !text-surface-900-50-token relative z-10 inline-flex items-center px-4 py-2 text-sm border-r border-surface-500 ${
        pageNum === page ? 'bg-surface-500' : ''
      }`}
      on:click={() => setPage(page)}
    >
      {page + 1}
    </button>
  {/each}

  <button
    class="!no-underline hover:!underline !text-surface-900-50-token relative text-sm inline-flex items-center rounded-r-md px-2 py-2"
    on:click={() => setPage(pageNum + 1)}
    disabled={pageNum + 1 >= totalPages}
  >
    Next
  </button>
</nav>
