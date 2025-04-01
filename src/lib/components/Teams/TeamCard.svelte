<script lang="ts">
  import type { Team } from '$lib/types/sprintlog';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Add } from '@steeze-ui/carbon-icons';
  import { OverflowMenuHorizontal } from '@steeze-ui/carbon-icons';

  export let team: Team;
  console.log("team member")
  console.log(team.members[0])
</script>

<a href="/teams/{team.id}" class="card bg-initial card-hover overflow-hidden mt-2">
  <div class="flex items-center">
    <div
      class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-9 h-9 m-2 text-surface-800"
    >
      {team.name?.charAt(0).toUpperCase()}
 
    </div>
    <span>{team.name}</span>
    <div class="ml-auto px-2">
      <button class="btn-icon hover:variant-soft w-8"><Icon src={Add} /></button>
      <button class="btn-icon hover:variant-soft w-8"><Icon src={OverflowMenuHorizontal} /></button>
    </div>
  </div>
  <hr class="opacity-50" />
  <div class="flex justify-between items-center">
 
    {#each team.members as member}
    <div
      class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-5 h-5 m-2 text-xs text-surface-800"
    >
      {member.name?.charAt(0).toUpperCase()}
    </div>

    {/each}
  
    <span class="text-xs p-2">8 August 2023</span>
  </div>
</a>
