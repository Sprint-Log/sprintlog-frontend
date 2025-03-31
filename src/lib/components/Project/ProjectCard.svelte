<script lang="ts">
  import type { Project } from '$lib/types/sprintlog';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Edit, Archive } from '@steeze-ui/carbon-icons';
  import { EllipsisHorizontal } from '@steeze-ui/heroicons';
  import { createEventDispatcher } from 'svelte';
  import { popup } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import type { ProjectStatus } from '$lib/types/sprintlog';

  export let project: Project;
  const dispatch = createEventDispatcher();

  const statusColorMap: Record<ProjectStatus, string> = {
    not_started: 'text-gray-600 bg-gray-400',
    active: 'text-green-600 bg-green-400',
    completed: 'text-blue-600 bg-blue-400',
    on_hold: 'text-yellow-600 bg-yellow-400',
    cancelled: 'text-red-600 bg-red-400'
  };

  const popupClick: PopupSettings = {
    event: 'click',
    target: `popup-${project.id}`,
    placement: 'bottom-end'
  };
</script>

<a
  class="card bg-initial card-hover overflow-hidden relative"
  href={`/sprintlogs/project/${project.slug}`}
>
  <div class="flex justify-between p-5 items-start">
    <div>
      <div
        class="rounded-sm flex justify-center items-center ${statusColorMap[
          project.status
        ]} text-surface-800 text-sm px-2 py-3 h-4 mb-2 w-fit"
      >
        {project.status.replace('_', ' ').toUpperCase()}
      </div>
      <h3 class="font-semibold text-lg">{project.name}</h3>
    </div>

    <button
      class="btn-icon hover:variant-soft"
      use:popup={popupClick}
      on:click|preventDefault|stopPropagation
    >
      <Icon src={EllipsisHorizontal} />
    </button>

    <div
      class="card bg-surface-100 border shadow w-44 p-2 text-sm z-10"
      data-popup={`popup-${project.id}`}
    >
      <button
        class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700
 rounded"
        on:click={(e) => {
          e.preventDefault();
          dispatch('update', { project });
        }}
      >
        <Icon src={Edit} size="20" class="inline mr-2" /> Update Project
      </button>
      <button
        class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700
 rounded"
        on:click={(e) => {
          e.preventDefault();
          dispatch('archive', { id: project.id.toString() });
        }}
      >
        <Icon src={Archive} size="20" class="inline mr-2" /> Archive Project
      </button>

      <div class="arrow variant-filled-primary" />
    </div>
  </div>

  <hr class="opacity-50" />
  <div class="p-4 space-y-4 overflow-auto">
    <article>{@html project.description}</article>
  </div>

  <footer class="p-4 flex justify-between items-center text-sm text-gray-500">
    <span>Started On {project.start_date}</span>
    <span>Due On {project.end_date}</span>
  </footer>
</a>
