<script lang="ts">
  import type { Project, TeamCreate } from '$lib/types/sprintlog';
 
  import { createMutation } from '@tanstack/svelte-query';
  import { createQuery } from '@tanstack/svelte-query';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { modalStore } from '@skeletonlabs/skeleton';
  import { PROJECTS_QUERY_KEY, TEAM_DETAIL_QUERY_KEY, TEAM_QUERY_KEY } from '$lib/constants';
  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import { getProjects } from '$lib/api/sprintlog';
  import { createTeam } from '$lib/api/team';

  const client = useQueryClient();

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let newTeam = {} as TeamCreate;
  let errorMessage = "";


  $: projects = createQuery<Project[], Error>({
    queryKey: [PROJECTS_QUERY_KEY, page, limit, order],
    queryFn: () => getProjects(page, limit, order),
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  const createTeamMutation = createMutation({
    mutationFn: (team: TeamCreate) => createTeam(team),
    onSuccess: function (data) {
      client.setQueriesData([TEAM_DETAIL_QUERY_KEY, data.id], data);
      modalStore.close();
      client.invalidateQueries([TEAM_QUERY_KEY]);
    },
    onError: function (err: Error) {
      let errorMessage = err.message;
      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if(!newTeam.name) {
      errorMessage = "Team name cannot be empty";
    }
    
    if (newTeam.name) {
      $createTeamMutation.mutate(newTeam);
    }
  }
</script>

<Toast />
<form
  on:submit={handleSubmit}
  action=""
  class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2 gap-4">
    <h3>Create Team</h3>
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Team Name</span>
    <input
      bind:value={newTeam.name}
      type="text"
      class="input variant-form-material col-span-2 h-8"
      id="name"
      name="TeamName"
    />
  </div>
  <label class="label text-sm">
    <span>Description</span>
    <textarea
      bind:value={newTeam.description}
      class="input variant-form-material col-span-2 h-24"
    />
  </label>
  <p class="text-error-400">{errorMessage}</p>
  <div class="flex justify-between py-2">
    <button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
  </div>
</form>
