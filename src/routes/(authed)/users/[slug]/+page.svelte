<script lang="ts">
  import type { PageData } from '../../users/[slug]/$types';
  import type { SprintlogPagination } from '$lib/types/sprintlog';

  import TaskListBox from '$lib/components/Sprintlog/TaskListBox.svelte';
  import ActiveProjectCard from '$lib/components/Users/ActiveProjectCard.svelte';

  import { getProjectByUser } from '$lib/api/sprintlog';
  import { getActiveProjects } from '$lib/utils/getActiveProject';
  import { generatePageNumbers } from '$lib/utils/getPageNum';

  import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import { page } from '$app/stores';

  $: user_id = $page.params.slug;

  let intervalMs = 1500000;
  let limit = 1;
  $: pageNum = 0;
  let order = 'asc';
  let totalItems: number, totalPages: number;

  const setPage = (newPage: number) => {
    pageNum = newPage;
  };

  $: projects = createQuery<SprintlogPagination, Error>({
    queryKey: ['refetch-project-by-user', pageNum, limit, order],
    queryFn: async () => getProjectByUser(user_id, pageNum, limit, order),
    refetchInterval: intervalMs,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 0,
    keepPreviousData: true
  });

  $: {
    if ($projects.data != null) {
      totalItems = $projects.data?.total;
      totalPages = Math.ceil(totalItems / limit);
    }
  }

  $: middlePageNumbers = generatePageNumbers(pageNum, totalPages);
</script>

<div class="flex flex-col mt-2 px-4">
  <section class="">
    <h5 class="mb-2 font-semibold">Active Projects</h5>
    <div class="grid grid-cols-4 gap-2">
      {#if $projects.data == null}
        There is no project that the user is assigned
      {:else}
        {#each getActiveProjects($projects.data).projects as project (project.project_name)}
          <ActiveProjectCard {project} />
        {/each}
      {/if}
    </div>
    <div class="flex justify-end items-end py-2">
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
          on:click={() => setPage($projects.data ? pageNum + 1 : pageNum)}
          disabled={pageNum + 1 >= totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  </section>
  <section class="mb-12">
    <h5 class="mb-2 font-semibold">SprintLog Tasks</h5>
    <div class="grid h-full max-h-screen overflow-y-scroll">
      <div class="px-4 rounded h-full">
        <TaskListBox>
          <!-- listitem from listitemedit add(ref:authed/sprintlogs/pj/slug) -->
        </TaskListBox>
      </div>
    </div>
  </section>
</div>
