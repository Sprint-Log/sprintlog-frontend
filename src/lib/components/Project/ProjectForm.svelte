<script lang="ts">
  import type { ProjectCreate, Team } from '$lib/types/sprintlog';
  import { ProjectStatus } from '$lib/types/sprintlog';

  import { createProject, updateProject } from '$lib/api/sprintlog';
  import { getTeams } from '$lib/api/team';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { XMark } from '@steeze-ui/heroicons';
  import { Add, Close, Search } from '@steeze-ui/carbon-icons';

  import { createQuery, useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { modalStore, toastStore } from '@skeletonlabs/skeleton';
  import { PROJECTS_QUERY_KEY, TEAM_QUERY_KEY } from '$lib/constants';

  let limit = 100;
  let page = 1;
  let order = 'desc';
  let total = 0;
  let offset = 0;
  let searchTerm = '';
  let searchValue = '';
  let timer : number | null = null;

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

  $: teamsQuery = createQuery<Team[], Error>({
    queryKey: [TEAM_QUERY_KEY, page, limit, order],
    queryFn: async () => {
      let response = await getTeams(page, limit, order, searchTerm);
      total = response.total;
      offset = response.offset;
      return response.items;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  let is_update = false;
  let projectId = '';

  let project: ProjectCreate = {
    slug: '',
    name: '',
    pin: false,
    description: '',
    documents: [],
    labels: [],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    sprintWeeks: 2,
    sprintAmount: 2,
    sprintCheckupDay: 3,
    repoUrls: [''],
    teams: [],
    teamIds: []
  };

  if ($modalStore[0].meta) {
    project = $modalStore[0].meta.project;
    is_update = true;
    projectId = $modalStore[0].meta.project.id;
  }

  $: project.slug = project.name.trim().toLowerCase().replace(/\s+/g, '_');
  const client = useQueryClient();

  $: projectMutation = createMutation({
    mutationFn: async () =>
      is_update ? updateProject(project, projectId) : createProject(project),
    onSuccess: function (data) {
      client.setQueriesData([PROJECTS_QUERY_KEY, data.id], data);
      client.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      toastStore.trigger({
        message: is_update ? 'Successfully update!' : 'Successfully create!',
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
  function onProjectCreate() {
    const regex = /^[A-Za-z0-9 _-]+$/;
    if (!regex.test(project.name)) {
      toastStore.trigger({
        message: 'Project name cannot contain special characters.',
        background: 'variant-filled-error'
      });
    } else {
      $projectMutation.mutate();
    }
  }
  function handleTeamChange(id: string, name: string) {
    if (project.teams?.some((team) => team.id == id)) {
      // project.teams = project.teams.filter(o => o != option);
    } else {
      project.teams = [...(project.teams || []), { id: id , name: name}];
      project.teamIds = [...(project.teamIds || []), id];
      //   teams = teams.filter((team)=> team.id != id);
      //   console.log(teams)
    }
  }

  function handleTeamRemove(id: string) {
    project.teams = project.teams?.filter((team) => team.id !== id);
  }
  $: project.teamIds = project.teams?.map((team) => team.id);

  let teams: Team[];

  $: if (searchTerm == '') {
    teams = [];
  } else {
    teams =
      $teamsQuery.data?.filter(
        (team) =>
          team.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !project.teams?.some((t) => t.id === team.id)
      ) || [];
  }
</script>

<form
  on:submit|preventDefault={onProjectCreate}
  class="card bg-surface-100 p-6 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[46rem]"
>
  <h2>{is_update ? 'Update Project' : 'Create Project'}</h2>
  <div class="grid grid-cols-2 gap-4">
    <label class="label">
      <span>Name</span>
      <input
        class="input variant-form-material"
        type="text"
        placeholder="Enter Name"
        bind:value={project.name}
      />
    </label>
    <label class="label">
      <span>Slug</span>
      <input
        class="input variant-form-material"
        type="text"
        placeholder="Slug"
        bind:value={project.slug}
        readonly
      />
    </label>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <label class="label">
      <span>Start Date</span>
      <input class="input variant-form-material" type="date" bind:value={project.startDate} />
    </label>
    <label class="label">
      <span>End Date</span>
      <input class="input variant-form-material" type="date" bind:value={project.endDate} />
    </label>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <label class="label">
      <span>Sprint Weeks</span>
      <input
        class="input variant-form-material"
        type="number"
        placeholder="Enter Sprint Weeks"
        bind:value={project.sprintWeeks}
      />
    </label>
    <label class="label">
      <span>Sprint Amount</span>
      <input
        class="input variant-form-material"
        type="number"
        placeholder="Enter Sprint Amount"
        bind:value={project.sprintAmount}
      />
    </label>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <label class="label">
      <span>Sprint Checkup Day</span>
      <input
        class="input variant-form-material"
        type="number"
        placeholder="Enter Sprint Checkup day"
        bind:value={project.sprintCheckupDay}
      />
    </label>
    <label class="label">
      <span>Project Status</span>
      <select bind:value={project.status} class="input variant-form-material h-10 w-full text-xs">
        {#each Object.values(ProjectStatus) as status}
          <option value={status}>{status.replaceAll('_', ' ').toUpperCase()}</option>
        {/each}
      </select>
    </label>
  </div>
  <label class="label">
    <span>Repository URLs</span>
    <div class="grid grid-cols-2 gap-4">
      {#each project.repoUrls as url, i}
        <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
          <input type="text" placeholder="Enter URL" bind:value={url} />
          <button
            class="variant-filled-error btn-icon rounded-none"
            type="button"
            on:click={() => {
              const urls = project.repoUrls;
              project.repoUrls = [...urls.slice(0, i), ...urls.slice(i + 1)];
            }}
          >
            <Icon src={XMark} />
          </button>
        </div>
      {/each}
      <button
        on:click={() => (project.repoUrls = [...project.repoUrls, ''])}
        type="button"
        class="btn variant-outline-surface"><Icon src={Add} size="20" /></button
      >
    </div>
  </label>
  <!-- <CMEditor 
	bind:description={project.description} 
	on:save={(event) => {
		project.description = event.detail.text;
		$projectMutation.mutate()
		}} /> -->
  <label class="label">
    <span>Project Description</span>
    <textarea
      class="input variant-form-material"
      placeholder="Enter Description"
      bind:value={project.description}
    />
  </label>

  <label class="label">
    <span>Teams</span>
    <div class="border border-surface-300 rounded-md px-2 flex flex-col">
      <div class="flex items-center gap-2 p-2">
        <input
          bind:value={searchValue}
          type="text"
          placeholder="Search"
          class="bg-transparent text-surface-400 text-sm outline-none w-full border-0 focus:ring-0"
        />
        <Icon src={Search} size="24" />
      </div>
      {#if $teamsQuery.isLoading}
        <div class="p-3 text-left">Loading</div>
      {:else if $teamsQuery.isError}
        <div class="p-3 text-left">Error has occurred</div>
      {:else if $teamsQuery.isSuccess}
        {#each teams as team, i}
          <!-- <option value={team.id}>{team.name}</option> -->
          <button
            class="p-3 text-left {i !== teams.length - 1 ? 'border-b' : ''} border-gray-500"
            on:click|preventDefault|stopPropagation={() => handleTeamChange(team.id, team.name)}
          >
            {team.name}
          </button>
        {/each}
      {/if}
    </div>
    <!-- <select
      on:change={(event) => {
        handleTeamChange(event);
        console.log(project);
      }}
      class="h-10 w-full"
    >
      {#if $teams.isLoading}
        <option value="">Loading</option>
      {:else if $teams.isError}
        <option value="">Error has occurred</option>
      {:else if $teams.isSuccess}
        {#each $teams.data as team}
          <option value={team.id}>{team.name}</option>
        {/each}
      {/if}
    </select> -->
  </label>
  <div class="flex flex-wrap gap-2">
    {#each project.teams ?? [] as team}
      <div class=" border rounded-md flex justify-between p-2 gap-2">
        <div>{team.name}</div>
        <button on:click|preventDefault={() => handleTeamRemove(team.id)} class="w-5">
          <Icon src={Close} />
        </button>
      </div>
    {/each}
  </div>

  <div class="text-right pt-4">
    <button class="btn variant-filled-primary" type="submit">
      {is_update ? 'Update' : 'Create'}</button
    >
  </div>
</form>
