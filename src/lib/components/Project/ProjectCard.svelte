<script lang="ts">
 
  import type { Project } from '$lib/types/sprintlog';
  import type { PopupSettings } from '@skeletonlabs/skeleton';

  import { ProjectStatus } from '$lib/types/sprintlog';
  import { updateProjectStatus } from '$lib/api/sprintlog';
  import { debouncer } from '$lib/utils/debounce';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Edit, Archive } from '@steeze-ui/carbon-icons';
  import { EllipsisHorizontal } from '@steeze-ui/heroicons';
  import { createEventDispatcher } from 'svelte';
  import { popup } from '@skeletonlabs/skeleton';

  export let project: Project;
  const dispatch = createEventDispatcher();

  const popupClick: PopupSettings = {
    event: 'click',
    target: `popup-${project.id}`,
    placement: 'bottom-end'
  };

  const statusEmojiMap: Record<ProjectStatus, string> = {
    not_started: '⬜⬜⬜',
    initiated: '🟩⬜⬜',
    active: '🟩🟩⬜',
    completed: '🟩🟩🟩',
    on_hold: '🟨🟨⬜',
    cancelled: '🟥🟥🟥'
  };

  const statusOrder: ProjectStatus[] = [
    ProjectStatus.NOT_STARTED,
    ProjectStatus.INITIATED,
    ProjectStatus.ACTIVE,
    ProjectStatus.COMPLETED
  ];

  function increaseStatus(current: ProjectStatus): ProjectStatus {
  
    const index = statusOrder.indexOf(current);
    return statusOrder[(index + 1) % (statusOrder.indexOf(ProjectStatus.COMPLETED) +1) ];
  }

  function decreaseStatus(current: ProjectStatus): ProjectStatus {
    const index = statusOrder.indexOf(current);
    return statusOrder[Math.max(index - 1, 0)];
  }
  const debouncedUpdate = debouncer(1000, async () => {
    await updateProjectStatus(project.id, project.status);
  });

  async function handleStatusChange(direction: 'increase' | 'decrease') {
    const nextStatus =
      direction === 'increase' ? increaseStatus(project.status) : decreaseStatus(project.status);

    if (nextStatus !== project.status) {
      project.status = nextStatus;
      debouncedUpdate();
    }
  }
  export let fromTeam = false;
</script>

<a
  class="card bg-initial card-hover overflow-hidden relative"
  href={`/sprintlogs/project/${project.slug}`}
>
  <div class="flex justify-between p-5 items-start">
    <div class="flex-1 flex items-center">
      <h3 class="font-semibold text-lg">{project.name}</h3>
    </div>

    <div class="flex flex-col items-end gap-2 ml-5">
      {#if !fromTeam}
      <button
        class="btn-icon hover:variant-soft"
        use:popup={popupClick}
        on:click|preventDefault|stopPropagation
      >
        <Icon src={EllipsisHorizontal} />
      </button>  
      {/if}
      <button
        class="text-xl font-mono tracking-wider cursor-pointer select-none transition duration-300 hover:scale-110 active:scale-95"
        on:click|stopPropagation|preventDefault={() => handleStatusChange('increase')}
        title="Click to update status"
      >
        {statusEmojiMap[project.status]}
      </button>
    </div>

    <div
      class="card bg-surface-100 border shadow w-44 p-2 text-sm z-10"
      data-popup={`popup-${project.id}`}
    >
      <button
        class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
        on:click={(e) => {
          e.preventDefault();
          dispatch('update', { project });
        }}
      >
        <Icon src={Edit} size="20" class="inline mr-2" /> Update Project
      </button>
      <button
        class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-surface-700 rounded"
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

  <!-- Divider -->
  <hr class="opacity-50" />

  <div class="p-4 space-y-4 overflow-auto">
    <article>{@html project.description}</article>
  </div>

  <footer class="p-4 flex justify-between items-center text-sm text-gray-500">
    <span>Started On {project.startDate}</span>
    <span>Due On {project.endDate}</span>
  </footer>
</a>
