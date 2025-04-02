<script lang="ts">
  import type { User, Team, TeamMember } from '$lib/types/sprintlog';

  import { addMembers } from '$lib/api/team';
  import { getUsers } from '$lib/api/sprintlog';
  import { USERS_QUERY_KEY, TEAM_QUERY_KEY } from '$lib/constants';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { Search } from '@steeze-ui/carbon-icons';
  import { createQuery, useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { modalStore, toastStore } from '@skeletonlabs/skeleton';

  const team: Team = $modalStore[0].meta.team;
  const client = useQueryClient();

  let page = 1;
  let limit = 20;
  let order = 'desc';
  let teamMembers = [] as TeamMember[];
  let addMemberForm: HTMLFormElement;

  $: usersQuery = createQuery<User[], Error>({
    queryKey: [USERS_QUERY_KEY, page, limit, order],
    queryFn: () => getUsers(page, limit, order),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true
  });

  const addMemberMutation = createMutation({
    mutationFn: () => addMembers(team.id, teamMembers),

    onSuccess: () => {
      toastStore.trigger({
        message: 'New Member are successfully added!',
        background: 'variant-filled-success',
        timeout: 1000
      });
      client.invalidateQueries([TEAM_QUERY_KEY]);
      addMemberForm.style.display = 'none';
      setTimeout(() => {
        modalStore.close();
      }, 1000);
    },
    onError: (error: any) => {
      let errorMessage = error.message || 'Something went wrong';
      toastStore.trigger({ message: errorMessage, background: 'variant-filled-error' });
    }
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    $addMemberMutation.mutate();
  }

  let memberSelections: Record<string, { checked: boolean; role: string }> = {};

  function toggleUserSelection(user: User, checked: boolean) {
    memberSelections[user.id] = {
      ...(memberSelections[user.id] || { role: '' }),
      checked
    };
    updateTeamMembers();
  }

  function updateUserRole(user: User, role: string) {
    memberSelections[user.id] = {
      ...(memberSelections[user.id] || { checked: false }),
      role
    };
    updateTeamMembers();
  }

  function updateTeamMembers() {
    teamMembers = Object.entries(memberSelections)
      .filter(([_, data]) => data.checked && data.role)
      .map(([userId, data]) => ({
        id: userId,
        role: data.role.toUpperCase() as 'ADMIN' | 'MEMBER'
      }));
  }

  let searchTerm = "";
  $: users = $usersQuery.data?.filter(user => user.name?.toLowerCase().includes(searchTerm.toLowerCase())) || [];
</script>

<form
  bind:this={addMemberForm}
  on:submit={handleSubmit}
  action=""
  class="left-24 card bg-surface-100 p-4 rounded-md space-y-6 w-[521px] overflow-y-auto max-h-[36rem]"
>
  <!-- Header and Search -->
  <div class="flex justify-between items-center">
    <h3 class="text-lg font-semibold">Add Member</h3>
    <form action="" class="w-56">
      <div class="flex items-center gap-2 border border-surface-300 rounded-xl px-2">
        <Icon src={Search} size="32" />
        <input bind:value={searchTerm}
          type="text"
          placeholder="Search"
          class="bg-transparent text-surface-400 text-white text-sm outline-none w-full border-0 focus:ring-0"
        />
      </div>
    </form>
  </div>

  <div class="space-y-3">
    {#each users || [] as user}
      <div class="grid grid-cols-[auto_10rem_auto_auto] gap-3 items-center px-2 py-2">
        <div class="flex items-center gap-2 w-[14rem]">
          <span
            class="rounded-full w-8 h-8 bg-surface-200 flex items-center justify-center text-black font-semibold shrink-0"
          >
            {user.name?.charAt(0).toUpperCase()}
          </span>
          <p class="truncate w-full">{user.name}</p>
        </div>

        <select
          class="variant-form-material h-8 w-[144px] text-white bg-[#3C374A] rounded text-xs"
          on:change={(e) => updateUserRole(user, e.target.value)}
        >
          <option selected value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          type="checkbox"
          class="w-5 h-5 accent-[#3C374A]"
          on:change={(e) => toggleUserSelection(user, e.target.checked)}
        />
      </div>
    {/each}
  </div>

  <hr class="opacity-50" />

  <div class="flex justify-end">
    <button class="btn btn-sm variant-filled-primary" type="submit">Add</button>
  </div>
</form>
