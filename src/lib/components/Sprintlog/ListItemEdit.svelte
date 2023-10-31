<script lang="ts">
  import {
    priorityCircle,
    progressCircle,
    toggleCompletion,
    updateSprintlog
  } from '$lib/api/sprintlog';
  import Field from '$lib/components/Sprintlog/Fields.svelte';
  import type { Sprintlog, User } from '$lib/types/sprintlog';
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { createEventDispatcher } from 'svelte';
  import CmEditor from '../Editors/CMEditor.svelte';
  import InlineEditor from '../Editors/InlineEditor.svelte';
  import BacklogActions from './BacklogActions.svelte';
  import TaskActions from './TaskActions.svelte';
  import TimeField from './TimeField.svelte';
  import Members from '../FloatingTaskInput/MembersChoice.svelte';
  export let item: Sprintlog;
  export let isTask = true;
  export let currentUser: User;
  let topic: string = item.title;
  let client = useQueryClient();
  let expand = false;
  type FlagName =
    | 'descriptionEdit'
    | 'assigneeEdit'
    | 'ownerEdit'
    | 'titleEdit'
    | 'begDateEdit'
    | 'dueDateEdit';
  import { debouncer } from '$lib/utils/debounce';
  import ClickableIcon from './ClickableIcon.svelte';
  import { AddAlt, SubtractAlt } from '@steeze-ui/carbon-icons';
  type Flags = {
    [key in FlagName]: boolean;
  };

  const flags: Flags = {
    descriptionEdit: false,
    assigneeEdit: false,
    ownerEdit: false,
    titleEdit: false,
    begDateEdit: false,
    dueDateEdit: false
  };
  function toggleFlag(flagName: FlagName) {
    flags[flagName] = !flags[flagName];
    resetOtherFlags(flagName);
  }

  function enableOnlyFlag(flagName: FlagName) {
    flags[flagName] = true;
    resetOtherFlags(flagName);
  }

  function resetOtherFlags(currentFlagName: FlagName) {
    Object.keys(flags).forEach((key) => {
      if (key !== currentFlagName) {
        flags[key as FlagName] = false;
      }
    });
  }

  function resetAllFlags() {
    Object.keys(flags).forEach((key) => {
      flags[key as FlagName] = false;
    });
    expand = false;
  }
  const toggleCompletionMutation = createMutation(
    async function () {
      return toggleCompletion(item.slug);
    },
    {
      onSuccess: function () {
        client.invalidateQueries(['refetch-backlogs']);
        client.invalidateQueries(['refetch-tasks']);
        dispatch('completion');
      }
    }
  );
  const handleItemClick = function (event: any, item: any) {};
  const handleBegDateClick = function (event: any, item: any) {
    toggleFlag('begDateEdit');
  };

  const dueDateClick = function (event: any, item: any) {
    toggleFlag('dueDateEdit');
  };
  let isCurrentlyAssigned = currentUser?.id === item.assignee_id;
  const dispatch = createEventDispatcher();

  const progressCircleMutation = createMutation(
    async function () {
      return progressCircle(item.slug);
    },
    {
      onSuccess: function () {
        client.invalidateQueries(['refetch-backlogs']);
        client.invalidateQueries(['refetch-tasks']);
        dispatch('completion');
      }
    }
  );
  const priorityCircleMutation = createMutation(
    async function () {
      return priorityCircle(item.slug);
    },
    {
      onSuccess: function () {
        client.invalidateQueries(['refetch-backlogs']);
        client.invalidateQueries(['refetch-tasks']);
        dispatch('completion');
      }
    }
  );
  const postMutation = createMutation(
    async function () {
      return updateSprintlog(item);
    },
    {
      onSuccess: function () {
        client.invalidateQueries(['refetch-backlogs']);
        client.invalidateQueries(['refetch-tasks']);
        topic = '';
        dispatch('completion');
      }
    }
  );
  function toggleExpand() {
    expand = !expand;
    // flagManager.enableOnlyFlag('descriptionEdit');
    // resetAllFlags();
  }
  function onDescriptionEdit() {
    enableOnlyFlag('descriptionEdit');
  }
  function addDescription() {
    expand = !expand;
    expand = true;
    enableOnlyFlag('descriptionEdit');
  }
  const debouncedResetAllFlags = debouncer(800, () => resetAllFlags());
</script>

<div
  class="hover:variant-ringed-primary py-0.5 group"
  on:mouseleave={() => debouncedResetAllFlags()}
  on:blur={() => debouncedResetAllFlags()}
  on:focusout={() => debouncedResetAllFlags()}
>
  <div class="flex space-x-3 space-y-1">
    <div class="flex-1">
      <span>
        <Field
          text={item.status}
          color="select-none hover:variant-soft-secondary"
          typography="text-sm font-bold"
          onItemClick={handleItemClick}
        />
        <Field
          text={`[${item.slug}]`}
          color="uppercase  hover:variant-soft-secondary"
          typography="text-sm font-mono font-bold"
          onItemClick={handleItemClick}
        />

        <Field
          text={item.priority}
          color="select-none hover:variant-soft-secondary"
          typography="text-sm font-semibold"
          onItemClick={() => $priorityCircleMutation.mutate()}
        />
        <Field
          text={item.progress}
          color="select-none hover:variant-soft-secondary"
          typography="text-sm font-normal"
          onItemClick={() => $progressCircleMutation.mutate()}
        />
        <Field
          text={item.category}
          color="select-none hover:variant-soft-secondary"
          typography="text-sm font-medium"
          onItemClick={handleItemClick}
        />

        {#if flags.titleEdit}
          <InlineEditor
            bind:topic={item.title}
            on:save={() => {
              $postMutation.mutate();
              resetAllFlags();
            }}
            on:blur={() => {
              debouncedResetAllFlags();
              $postMutation.mutate();
            }}
          />
        {:else}
          <Field
            text={item.title}
            color="hover:variant-soft-primary"
            typography="text-sm font-mono"
            onItemClick={() => toggleFlag('titleEdit')}
          />
        {/if}
      </span>
      <span class="">
        {#if flags.begDateEdit}
          <input
            class="resize-none bg-transparent text-xs font-mono"
            type="date"
            bind:value={item.beg_date}
            on:change={() => {
              $postMutation.mutate();
              resetAllFlags();
            }}
          />
        {:else}
          <TimeField
            prefix="⏱️"
            text={item.beg_date}
            color=""
            typography="text-sm font-normal"
            onItemClick={handleBegDateClick}
          />
        {/if}
        {#if flags.dueDateEdit}
          <input
            class="resize-none bg-transparent text-xs font-mono"
            type="date"
            bind:value={item.due_date}
            on:change={() => {
              $postMutation.mutate();
              resetAllFlags();
            }}
          />
        {:else}
          <TimeField
            text={item.due_date}
            prefix="⏰"
            color=""
            typography="text-sm font-semibold"
            onItemClick={dueDateClick}
          />
        {/if}
        {#if flags.assigneeEdit}
          <Members
            bind:assignee={item.assignee}
            on:assigneeSelected={() => {
              item.assignee_id = item.assignee?.id;
              $postMutation.mutate();
              resetAllFlags();
            }}
          />
        {:else}
          <Field
            text={`@${item.assignee_name}`}
            color="select-none hover:variant-soft-secondary {isCurrentlyAssigned
              ? 'text-slate-100'
              : ''}"
            typography="text-sm font-mono"
            onItemClick={() => toggleFlag('assigneeEdit')}
          />
        {/if}
        {#if item.description}
          <span
            class="px-2 select-none cursor-pointer text-slate-500 text-xs"
            on:click={toggleExpand}
            on:keydown={toggleExpand}
          >
            {expand ? 'less' : 'more'}
          </span>
        {/if}
      </span>
    </div>
    <span class="inline-flex px-4 gap-x-2 items-top group-hover:opacity-100 opacity-0">
      {#if isTask}
        <TaskActions
          {item}
          on:completion={() => {
            resetAllFlags();
          }}
          on:progress_complete={() => {
            $toggleCompletionMutation.mutate();
          }}
          on:edit={addDescription}
        />
      {:else}
        <BacklogActions
          {item}
          on:completion={() => {
            resetAllFlags();
          }}
          on:progress_complete={() => {
            $toggleCompletionMutation.mutate();
          }}
          on:edit={addDescription}
        />
      {/if}
    </span>
  </div>
  {#if expand}
    <div class="p-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6">
      {#if item.description}
        {#if flags.descriptionEdit}
          <CmEditor
            bind:description={item.description}
            readonly={false}
            on:save={(event) => {
              item.description = event.detail.text;
              $postMutation.mutate();
            }}
            on:lostFocus={(event) => {
              item.description = event.detail.text;
              debouncedResetAllFlags();
              $postMutation.mutate();
            }}
          />
        {:else}
          <CmEditor readonly={true} bind:description={item.description} />
        {/if}
      {:else}
        <div
          class="p-2 bg-surface-100-800-token"
          on:click={() => addDescription()}
          on:keydown={() => addDescription()}
        >
          Click to add Description
        </div>
      {/if}
    </div>
  {/if}
</div>
