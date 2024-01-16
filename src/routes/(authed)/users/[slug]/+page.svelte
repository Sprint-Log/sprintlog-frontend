<script lang="ts">
  import type { ActiveProjectPagination, Sprintlog, User } from '$lib/types/sprintlog';

  import TaskListBox from '$lib/components/Sprintlog/TaskListBox.svelte';
  import TaskBox from '$lib/components/Sprintlog/TaskListBox.svelte';
  import Listitem from '$lib/components/Sprintlog/ListItemEdit.svelte';
  import ActiveProjectCard from '$lib/components/Users/ActiveProjectCard.svelte';
  import Pagination from '$lib/components/Paginator/Pagination.svelte';

  import { getProjectByUser, getSprintlogTaskByUser, getUserById } from '$lib/api/sprintlog';
  import { page } from '$app/stores';

  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { useQueryClient, createQuery } from '@tanstack/svelte-query';

  $: user_id = $page.params.slug;

  $: currentUser = createQuery<User, Error>({
    queryKey: ['refetch-selected-user', user_id],
    queryFn: async () => await getUserById(user_id),
    refetchInterval: intervalMs,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  let intervalMs = 1500000;
  let limit = 12;
  $: pageNum = 0;
  let order = 'asc';
  let totalItems: number, totalPages: number;

  const setPage = (newPage: number) => {
    pageNum = newPage;
  };

  $: activeProjects = createQuery<ActiveProjectPagination, Error>({
    queryKey: ['refetch-project-by-user', user_id, pageNum, limit, order],
    queryFn: async () => await getProjectByUser(user_id, pageNum, limit, order),
    refetchInterval: intervalMs,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 100000,
    keepPreviousData: true
  });

  $: tasks = createQuery<Sprintlog[], Error>({
    queryKey: ['refetch-task-by-user', user_id],
    queryFn: async () => getSprintlogTaskByUser(user_id),
    refetchInterval: intervalMs,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 100000,
    keepPreviousData: true
  });

  $: {
    if ($activeProjects.data != null) {
      totalItems = $activeProjects.data?.total;
      totalPages = Math.ceil(totalItems / limit);
    }
  }
</script>

<div class="flex flex-col mt-2 px-4">
  <section class="">
    <h5 class="mb-2 font-semibold">Active Projects</h5>
    <div class="grid grid-cols-4 gap-2">
      {#if $activeProjects.isLoading}
        <div class="h-full grid place-items-center">
          <ProgressRadial width="w-12" />
        </div>
      {:else if $activeProjects.isSuccess}
        {#if $activeProjects.data.items.length == 0}
          There is no project that the user is assigned to
        {:else}
          {#each $activeProjects.data.items as project}
            <ActiveProjectCard {project} />
          {/each}
        {/if}
      {/if}
    </div>
    <div class="flex justify-end items-end py-2">
      {#if $activeProjects.data && $activeProjects.data.items.length !== 0}
        <Pagination {pageNum} {totalPages} {setPage} />
      {/if}
    </div>
  </section>
  <section class="mb-12">
    <h5 class="mb-2 font-semibold">SprintLog Tasks</h5>
    <div class="grid h-full max-h-screen overflow-y-scroll">
      <div class="px-4 rounded h-full">
        <TaskListBox>
          {#if $tasks.isLoading}
            <div class="h-full grid place-items-center">
              <ProgressRadial width="w-12" />
            </div>
          {:else}
            <TaskBox>
              {#if $tasks.isSuccess && $currentUser.data}
                {#each $tasks.data as task}
                  <Listitem item={task} isTask={true} currentUser={$currentUser.data} />
                {/each}
              {/if}
            </TaskBox>
          {/if}
        </TaskListBox>
      </div>
    </div>
  </section>
</div>
