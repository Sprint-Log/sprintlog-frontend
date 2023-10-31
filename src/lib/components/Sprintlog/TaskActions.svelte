<script lang="ts">
  import type { Sprintlog } from '$lib/types/sprintlog';
  import { useQueryClient, createMutation, createQuery } from '@tanstack/svelte-query';
  import { toggleCompletion, switchToBacklog } from '$lib/api/sprintlog';
  import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
  import {
    CheckmarkOutline,
    OverflowMenuVertical,
    UserAdmin,
    Calendar,
    RowExpand,
    RowCollapse,
    UpToTop,
    SubtractAlt,
    AddAlt,
    Edit
  } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';

  export let item: Sprintlog;
  let client = useQueryClient();

  const dispatch = createEventDispatcher();

  const switchToBacklogMutation = createMutation(
    async function () {
      return switchToBacklog(item.slug);
    },
    {
      onSuccess: function () {
        client.invalidateQueries(['refetch-backlogs']);
        client.invalidateQueries(['refetch-tasks']);
      }
    }
  );
</script>

<ClickableIcon
  color="fill-blue-300"
  id="edit"
  iconSrc={Edit}
  onItemClick={() => dispatch('edit')}
/>

<ClickableIcon
  id="switch_backlog"
  iconSrc={RowCollapse}
  color="fill-yellow-300"
  onItemClick={() => $switchToBacklogMutation.mutate()}
/>
<ClickableIcon
  id="checkmark"
  iconSrc={CheckmarkOutline}
  color="fill-green-500"
  onItemClick={() => {
    dispatch('progress_complete');
  }}
/>
