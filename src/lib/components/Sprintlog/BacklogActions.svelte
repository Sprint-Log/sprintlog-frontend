<script lang="ts">
  import type { Sprintlog } from '$lib/types/sprintlog';
  import { useQueryClient, createMutation, createQuery } from '@tanstack/svelte-query';
  let client = useQueryClient();
  import { switchToTask } from '$lib/api/sprintlog';
  import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
  import {
    CheckmarkOutline,
    OverflowMenuVertical,
    UserAdmin,
    Calendar,
    RowExpand,
    RowCollapse,
    AddAlt,
    SubtractAlt,
    Edit
  } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';

  export let item: Sprintlog;
  const dispatch = createEventDispatcher();
  const switchToTaskMutation = createMutation(
    async function () {
      return switchToTask(item.slug);
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
  id="switch_task"
  iconSrc={RowExpand}
  size="22px"
  onItemClick={() => $switchToTaskMutation.mutate()}
  color="fill-yellow-300"
/>
