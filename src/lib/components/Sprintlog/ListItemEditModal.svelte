<script lang="ts">
	import type { Sprintlog } from '$lib/types/sprintlog';
	import { progressDown, progressUp, progressCircle, priorityCircle } from '$lib/api/sprintlog';
	import { useQueryClient, createQuery, createMutation } from '@tanstack/svelte-query';
	import Field from '$lib/components/Sprintlog/Fields.svelte';
	import TimeField from './TimeField.svelte';
	import TaskActions from './TaskActions.svelte';
	import BacklogActions from './BacklogActions.svelte';
	import { marked } from 'marked';
	import FloatingTaskInput from '../FloatingTaskInput/FloatingTaskInput.svelte';

	export let item: Sprintlog;
	export let isTask = true;
	let client = useQueryClient();
	let expand = false;
	let isEdit = false;
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
	function onEdit() {
		isEdit = !isEdit;
	}
</script>

{#if isEdit}
	<div class="hover:variant-ringed-tertiary py-0.5 group">
		<div class="px-2 space-x-3 space-y-1">
			<FloatingTaskInput
				bind:user={item['assignee']}
				{item}
				bind:project_slug={item.project_slug}
			/>
		</div>
	</div>
{:else}
	<div class="hover:variant-ringed-primary py-0.5 group">
		<div class="flex space-x-3 space-y-1">
			<div class="flex-1">
				<span class="flex-grow">
					<Field
						text={`[${item.slug}]`}
						color="uppercase  hover:variant-soft-secondary"
						typography="text-sm font-mono font-bold"
						onItemClick={handleItemClick}
					/>
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
				</span>
				<span class="inline-block">
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
				</span>
			</div>
			<span class="inline-flex gap-x-1.5 items-top group-hover:opacity-100 opacity-0">
				{#if isTask}
					<TaskActions
						{item}
						on:completion={() => {
							isEdit = false;
						}}
						on:expand={onExpand}
						on:edit={onEdit}
						{expand}
					/>
				{:else}
					<BacklogActions
						{item}
						on:completion={() => {
							isEdit = false;
						}}
						on:expand={onExpand}
						on:edit={onEdit}
						{expand}
					/>
				{/if}
			</span>
		</div>
		{#if expand && item.description}
			<div class="p-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6">
				<div class="rounded-md p-2 bg-surface-100-800-token">
					{@html marked.parse(item.description)}
				</div>
			</div>
		{/if}
	</div>
{/if}
