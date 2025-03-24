<script lang="ts">
  import type { Sprintlog } from '$lib/types/sprintlog';

  import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { switchToTask } from '$lib/api/sprintlog';
  import { RowExpand, Edit } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';
  import {SPRINTLOGS_BACKLOG_QUERY_KEY, TASKS_QUERY_KEY} from '$lib/constants';

  export let item: Sprintlog;

  const dispatch = createEventDispatcher();

  let client = useQueryClient();

  const switchToTaskMutation = createMutation(
    async function () {
      return switchToTask(item.slug);
    },
    {
      onSuccess: function () {
        client.invalidateQueries([SPRINTLOGS_BACKLOG_QUERY_KEY]);
        client.invalidateQueries([TASKS_QUERY_KEY]);
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
