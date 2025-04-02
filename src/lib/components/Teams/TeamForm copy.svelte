<script lang="ts">
  import type { Project, TeamCreate } from '$lib/types/sprintlog';
  import type { ModalSettings } from '@skeletonlabs/skeleton';
 
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Close } from '@steeze-ui/carbon-icons';
  import { createMutation } from '@tanstack/svelte-query';
  import { createQuery } from '@tanstack/svelte-query';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { Modal, modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
  import { PROJECTS_QUERY_KEY } from '$lib/constants';
  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import { deleteProject, getProjects } from '$lib/api/sprintlog';
  import { createTeam } from '$lib/api/team';

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let newTeam = {} as TeamCreate;

  const client = useQueryClient();

  $: projects = createQuery<Project[], Error>({
    queryKey: [PROJECTS_QUERY_KEY, page, limit, order],
    queryFn: () => getProjects(page, limit, order),
    refetchOnWindowFocus: true,
    cacheTime: 15000
  });

  const createTeamMutation = createMutation({
    mutationFn: () => createTeam(newTeam),
    onSuccess: function (data) {
      client.setQueriesData([PROJECTS_QUERY_KEY, data.id], data);
      client.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      modalStore.close();
    },
    onError: function (err: Error) {
      let errorMessage = err.message;
      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });
</script>

<Toast />
<form
  action=""
  class=" left-24 card bg-surface-100 p-3 rounded-md space-y-4 max-w-3xl overflow-y-scroll max-h-[36rem]"
>
  <div class="grid grid-cols-2 gap-4">
    <h3>Create Team</h3>
  </div>
  <div class="grid grid-cols-3 gap-3">
    <span>Choose Your Project</span>
    <select  class="input variant-form-material col-span-2 h-8">
      <option class="text-surface-100" value="" selected />
      {#if $projects.isLoading}
      <div class="h-full grid place-items-center">
        <ProgressRadial width="w-12" />
      </div>
      {/if}
      {#if $projects.error}
        An error has occurred:
        {$projects.error.message}
      {/if}
      {#if $projects.isSuccess}
        {#each $projects.data as project}
          <option value={project.id}>{project.name}</option>
        {/each}
      {/if}
    </select>

    <span>Team Name</span>
    <input type="text" class="input variant-form-material col-span-2 h-8" id="name" name="TeamName" />
  </div>
  <label class="label text-sm">
    <span>Description</span>
    <textarea class="input variant-form-material col-span-2 h-24" />
  </label>
  <label for="#id" />

  <div class="flex justify-between py-2">
    <button class="text-sm">Back</button>
    <button class="btn btn-sm variant-filled-primary" type="submit"> Create </button>
  </div>
</form>
