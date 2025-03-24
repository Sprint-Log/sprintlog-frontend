<script lang="ts">
  import type { Sprintlog } from '$lib/types/sprintlog';
  import { useQueryClient, createMutation } from '@tanstack/svelte-query';
  import { switchToBacklog } from '$lib/api/sprintlog';
  import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
  import { CheckmarkOutline, RowCollapse, Edit } from '@steeze-ui/carbon-icons';
  import { createEventDispatcher } from 'svelte';

  import { SPRINTLOGS_BACKLOG_QUERY_KEY, TASKS_QUERY_KEY } from '$lib/constants';

  export let item: Sprintlog;
  let client = useQueryClient();

  const dispatch = createEventDispatcher();

  const switchToBacklogMutation = createMutation(
    async function () {
      return switchToBacklog(item.slug);
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
