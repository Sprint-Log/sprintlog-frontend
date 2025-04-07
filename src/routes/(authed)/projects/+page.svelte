<script lang="ts">
  import type { Project } from '$lib/types/sprintlog';
  import type { ModalSettings } from '@skeletonlabs/skeleton';

  import { Add } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { createQuery } from '@tanstack/svelte-query';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { Modal, modalStore, ProgressRadial, Toast } from '@skeletonlabs/skeleton';
  import { PROJECTS_QUERY_KEY } from '$lib/constants';
  import { deleteProject, getProjects } from '$lib/api/sprintlog';
  import { goto } from '$app/navigation';

  import ProjectCard from '$lib/components/Project/ProjectCard.svelte';
  import ProjectForm from '$lib/components/Project/ProjectForm.svelte';
  export let data;

  let limit = 20;
  let page = 1;
  let order = 'desc';
  let client = useQueryClient();
  $: totalProjects = 0;

  let intervalMs = 15000;
  $: projects = createQuery<Project[], Error>({
    queryKey: [PROJECTS_QUERY_KEY, page, limit, order],
    queryFn: async() => {
      let paginatedProject = await getProjects(page, limit, order);
      let projects = paginatedProject.items;
      totalProjects = paginatedProject.total;
      return projects;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs,
    cacheTime: 15000
  });

  async function handelDelProject(event: CustomEvent<{ id: string }>) {
    const id = event.detail.id.toString();

    modalStore.trigger({
      type: 'confirm',
      title: 'Delete Project',
      body: 'Are you sure you want to delete this project?',

      response: async (confirmed) => {
        if (confirmed) {
          await deleteProject(id);
          client.setQueriesData([PROJECTS_QUERY_KEY, id], (oldData) => {
            if (oldData) {
              return { ...oldData, isActive: false };
            }
            return oldData;
          });
          client.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY, page, limit, order] });
          goto('/projects');
        }
      }
    });
  }

  async function handleUpdateProject(event: CustomEvent<{ project: Project }>) {
    const project = event.detail.project;

    let modal: ModalSettings = {
      type: 'component',
      component: 'form',
      meta: { project }
    };
    modalStore.trigger(modal);
  }

  function openModal() {
    modalStore.trigger({
      type: 'component',
      component: 'form'
    });
  }
</script>
<Toast/>
<Modal components={{ form: { ref: ProjectForm } }} />
<section class="p-8 flex-grow overflow-y-auto max-h-screen">
  <div class="flex items-center mb-8 space-x-4">
    <h2 class="font-semibold">Projects</h2>
    <button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
  </div>
  <div class="grid grid-cols-4 gap-3">
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
        <ProjectCard on:archive={handelDelProject} on:update={handleUpdateProject} {project} fromTeam={!data.user.isSuperuser}/>
      {/each}
    {/if}
  </div>
</section>
