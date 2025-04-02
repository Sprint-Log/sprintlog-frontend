<script lang="ts">
  import type { Team } from '$lib/types/sprintlog';
  import { getUserById } from '$lib/api/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add } from '@steeze-ui/carbon-icons';
  import { OverflowMenuHorizontal } from '@steeze-ui/carbon-icons';
  import { formatDate } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';

  export let team: Team;
  export let openModal: CallableFunction;

  const dispatch = createEventDispatcher();
</script>

<a
  href="/teams/{team.slug}"
  class="card bg-initial card-hover overflow-hidden mt-2"
  on:click={() => dispatch('selected', { team })}
>
  <div class="flex items-center">
    <div
      class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-9 h-9 m-2 text-surface-800"
    >
      {team.name?.charAt(0).toUpperCase()}
    </div>
    <span>{team.name}</span>
    <div class="ml-auto px-2">
      <button
        class="btn-icon hover:variant-soft w-8"
        on:click={() => openModal('teamMemberCard', { team })}
        on:click|preventDefault|stopPropagation><Icon src={Add} /></button
      >
      <button
        class="btn-icon hover:variant-soft w-8"
        on:click={() => openModal('teamPreviewCard', { team })}
        on:click|preventDefault|stopPropagation><Icon src={OverflowMenuHorizontal} /></button
      >
    </div>
  </div>
  <hr class="opacity-50" />
  <div class="flex items-center">
    <div class="flex -space-x-2">
      {#each team.members as member, i}
        <button
          on:click={async () => {
            let user = await getUserById(member.userId);
            openModal('userPreviewCard', { user });
          }}
          on:click|preventDefault|stopPropagation
          class="flex-none w-7 h-7 rounded-full bg-surface-200 border-2 border-white
                 text-xs text-surface-800 flex items-center justify-center
                 hover:z-10 hover:scale-105 transition-transform cursor-pointer"
          title={member.name}
        >
          {member.name?.charAt(0).toUpperCase()}
        </button>
      {/each}
    </div>

    <span class="text-xs pl-4">{formatDate(team.createdAt)}</span>
  </div>
</a>
