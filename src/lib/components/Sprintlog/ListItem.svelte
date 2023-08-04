<script lang="ts">
	import type { Sprintlog } from '$lib/types/sprintlog';
	import { progressDown, progressUp, progressCircle, priorityCircle } from '$lib/api/sprintlog';
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	import Field from '$lib/components/Sprintlog/Fields.svelte';
	import TimeField from './TimeField.svelte';
	import TaskActions from './TaskActions.svelte';
	import BacklogActions from './BacklogActions.svelte';

	export let item: Sprintlog;
	export let isTask = true;
	let client = useQueryClient();
	let expand = false;
	const handleItemClick = function (event: any, item: any) {
		client.invalidateQueries(['refetch-backlogs']);
	};
	const progressUpMutation = createMutation(
		async function () {
			return progressUp(item.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
	const progressDownMutation = createMutation(
		async function () {
			return progressDown(item.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
			}
		}
	);
	const progressCircleMutation = createMutation(
		async function () {
			return progressCircle(item.slug);
		},
		{
			onSuccess: function () {
				client.invalidateQueries(['refetch-backlogs']);
				client.invalidateQueries(['refetch-tasks']);
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
			}
		}
	);

	function onExpand() {
		expand = !expand;
	}
</script>

<div class="hover:variant-ringed-primary py-0.5 group">
	<div class="flex space-x-3 space-y-1">
		<div class="flex-1">
			<Field
				text={item.status}
				color=" select-none hover:variant-soft-secondary"
				typography="text-sm font-bold"
				onItemClick={handleItemClick}
			/>
			<Field
				text={item.category}
				color="select-none hover:variant-soft-secondary"
				typography="text-sm font-medium"
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
				text={`[${item.slug}]`}
				color="uppercase  hover:variant-soft-secondary"
				typography="text-sm font-mono"
				onItemClick={handleItemClick}
			/>
			<Field
				text={`@${item.assignee_name}`}
				color=" hover:variant-soft-secondary"
				typography="text-sm font-mono"
				onItemClick={handleItemClick}
			/>
			<Field
				text={item.title}
				color="hover:variant-soft-primary"
				typography="text-sm font-mono"
				onItemClick={handleItemClick}
			/>
			<TimeField
				prefix="⏱️"
				text={item.beg_date}
				color=""
				typography="text-sm font-normal"
				onItemClick={handleItemClick}
			/>
			<TimeField
				text={item.due_date}
				prefix="⏰"
				color=""
				typography="text-sm font-semibold"
				onItemClick={handleItemClick}
			/>
		</div>
		<span class="inline-flex gap-x-1.5 items-top group-hover:opacity-100 opacity-0">
			{#if isTask}
				<TaskActions {item} on:expand={onExpand} {expand} />
			{:else}
				<BacklogActions {item} on:expand={onExpand} {expand} />
			{/if}
		</span>
	</div>
	{#if expand}
		<div class="h-16">{item.description}</div>
	{/if}
</div>
