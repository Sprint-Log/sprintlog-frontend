<script lang="ts">
  import type { ActiveProjectPagination, Sprintlog, User } from '$lib/types/sprintlog';
  import type { QueryFunctionContext } from '@tanstack/svelte-query';

  import TaskListBox from '$lib/components/Sprintlog/TaskListBox.svelte';
  import TaskBox from '$lib/components/Sprintlog/TaskListBox.svelte';
  import Listitem from '$lib/components/Sprintlog/ListItemEdit.svelte';
  import ActiveProjectCard from '$lib/components/Users/ActiveProjectCard.svelte';
  import Pagination from '$lib/components/Paginator/Pagination.svelte';

  import { getProjectByUser, getSprintlogTaskByUser, getUserById } from '$lib/api/sprintlog';
  import { page } from '$app/stores';

  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { createQuery } from '@tanstack/svelte-query';
  import {
    USER_DETAIL_QUERY_KEY,
    PROJECT_BY_USER_QUERY_KEY,
    TASK_BY_USER_QUERY_KEY
  } from '$lib/constants';

  let pageNum = 0;
  let limit = 2;
  let order = 'asc';
  let totalItems: number;
  let totalPages: number;

  $: currentUser = createQuery<User, Error>({
    queryKey: [USER_DETAIL_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      return await getUserById(slug);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  const setPage = (newPage: number) => {
    pageNum = newPage;
  };
  
  $:if($page.params.slug){
    pageNum = 0;
  }

  $: activeProjects = createQuery<ActiveProjectPagination, Error>({
    queryKey: [PROJECT_BY_USER_QUERY_KEY, pageNum, limit, order, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[4] as string;
      return await getProjectByUser(slug, pageNum, limit, order);
    },
    onSuccess: (data) => {
      if (data) {
        totalItems = data.total;
        totalPages = Math.ceil(totalItems / limit);
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  $: tasks = createQuery<Sprintlog[], Error>({
    queryKey: [TASK_BY_USER_QUERY_KEY, $page.params.slug],
    queryFn: async (context: QueryFunctionContext) => {
      const slug = context.queryKey[1] as string;
      return await getSprintlogTaskByUser(slug);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
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
