<script lang="ts">
  import type { Team, Project, ProjectCreate } from '$lib/types/sprintlog';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add, Close, Search } from '@steeze-ui/carbon-icons';
  import { createMutation } from '@tanstack/svelte-query';
  import { createQuery } from '@tanstack/svelte-query';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { modalStore } from '@skeletonlabs/skeleton';
  import { TEAM_QUERY_KEY, PROJECT_DETAIL_QUERY_KEY, ASSIGNEE_QUERY_KEY } from '$lib/constants';
  import { toastStore } from '@skeletonlabs/skeleton';
  import { getTeams } from '$lib/api/team';
  import { updateProject } from '$lib/api/sprintlog';

  const project: Project = $modalStore[0].meta.project;
  const projectId: string = project.id;

  const updateProjectObj: ProjectCreate = {
    slug: project.slug,
    name: project.name,
    pin: project.pin,
    description: project.description,
    documents: project.documents,
    labels: project.labels,
    startDate: project.startDate,
    endDate: project.endDate,
    sprintWeeks: project.sprintWeeks,
    sprintAmount: project.sprintAmount,
    sprintCheckupDay: project.sprintCheckupDay,
    repoUrls: project.repoUrls,
    teams: project.teams,
    teamIds: project.teams?.map((team) => team.id)
  };

  const client = useQueryClient();

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let searchTerm = '';
  let searchValue = '';
  $: totalTeams = 0;
  // $: searchedResultTeamIds = [];
  let timer: number | null = null;
  let searchedResultTeamIds: Team[] = [];

  $: {
    if (searchTerm !== searchValue) {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        searchTerm = searchValue;
      }, 600);
    }
  }

  $: teams = createQuery<Team[], Error>({
    enabled: searchTerm !== '',
    queryKey: [TEAM_QUERY_KEY, searchTerm, page, limit, order],
    queryFn: async () => {
      let paginatedTeams = await getTeams(page, limit, order, searchTerm);
      totalTeams = paginatedTeams.total;
      return paginatedTeams.items;
    },
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  $: updateProjectMutation = createMutation({
    mutationFn: (project: ProjectCreate) => updateProject(project, projectId),
    onSuccess: function (data) {
      client.setQueriesData([PROJECT_DETAIL_QUERY_KEY, data.slug], data);
      client.invalidateQueries([ASSIGNEE_QUERY_KEY, data.slug], { exact: true });
      toastStore.trigger({
        message: 'Successfully Assigned team!',
        background: 'variant-filled-success',
        timeout: 1500
      });
      modalStore.close();
    },
    onError: function (err: Error) {
      let errorMessage = err.message;
      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });

  function addTeamHandler({ id, name }: Team, index: number) {
    if (updateProjectObj.teams?.some((team) => team.id == id)) {
    } else {
      updateProjectObj.teams = [...(updateProjectObj.teams || []), { id: id, name: name }];
      updateProjectObj.teamIds = [...(updateProjectObj.teamIds || []), id];
    }
  }

  function removeTeamHandler(id: string) {
    updateProjectObj.teams = updateProjectObj.teams?.filter((team) => team.id !== id);
    updateProjectObj.teamIds = updateProjectObj.teamIds?.filter((teamId) => teamId !== id);
  }

  $: if (searchTerm == '') {
    searchedResultTeamIds = [];
  } else if ($teams.isSuccess) {
    searchedResultTeamIds = $teams.data.filter(
      (team) => !updateProjectObj.teamIds?.includes(team.id)
    );
  }

  function updateProjectHandler(e: Event) {
    e.preventDefault();

    $updateProjectMutation.mutate(updateProjectObj);
  }
</script>

<form
  on:submit|preventDefault={updateProjectHandler}
  class="card bg-surface-100 p-6 rounded-md space-y-4 w-[36rem] overflow-y-auto max-h-[46rem]"
>
  <h2>Team Assignment</h2>

  <div class="grid grid-cols-3 gap-2">
    <span>Name</span>
    <input
      class="input variant-form-material col-span-2"
      type="text"
      placeholder="Enter Name"
      bind:value={project.name}
      disabled
    />
  </div>

  <label class="label">
    <span>Teams</span>
    <div
      class="border border-surface-300 rounded-md px-2 flex flex-col w-full max-h-[12rem] overflow-y-auto whitespace-nowrap"
    >
      <div class="flex items-center gap-2 p-2">
        <input
          bind:value={searchValue}
          type="text"
          placeholder="Search"
          class="bg-transparent text-surface-400 text-sm outline-none w-full border-0 focus:ring-0"
        />
        <Icon src={Search} size="24" />
      </div>

      {#if $teams.isError}
        <div class="p-3 text-left">Error has occurred</div>
      {:else if $teams.isSuccess}
        {#each searchedResultTeamIds as team, i}
          <button
            class="p-3 text-left {i !== $teams.data?.length - 1 ? 'border-b' : ''} border-gray-500"
            on:click|preventDefault|stopPropagation={() => addTeamHandler(team, i)}
          >
            {team.name}
          </button>
        {/each}
      {/if}
    </div>
  </label>

  <div class="flex flex-wrap gap-2">
    {#each updateProjectObj.teams ?? [] as team}
      <div class=" border rounded-md flex justify-between p-2 gap-2">
        <div>{team.name}</div>
        <button on:click|preventDefault={() => removeTeamHandler(team.id)} class="w-5">
          <Icon src={Close} />
        </button>
      </div>
    {/each}
  </div>

  <div class="text-center col-span-2">
    <button class="btn variant-filled-primary" type="submit"> Update</button>
  </div>
</form>
