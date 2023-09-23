<script lang="ts">
	import type { Sprintlog } from '$lib/types/sprintlog';
	import { useQueryClient, createMutation, createQuery } from '@tanstack/svelte-query';
	import { switchToBacklog } from '$lib/api/sprintlog';
	import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
	import {
		CheckmarkOutline,
		OverflowMenuVertical,
		UserAdmin,
		Calendar,
		DownToBottom,
		RowExpand,
		RowCollapse,

		UpToTop

	} from '@steeze-ui/carbon-icons';
	import { createEventDispatcher } from 'svelte';

	export let item: Sprintlog;
	export let expand: boolean;
	export let edit: boolean;
	let client = useQueryClient();

	const handleItemClick = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};
	const toBacklog = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};
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
	id="checkmark"
	iconSrc={expand ? UpToTop : DownToBottom}
	size="18px"
	onItemClick={() => dispatch('expand')}
/>
<ClickableIcon
	id="overflowMenu"
	iconSrc={OverflowMenuVertical}
	size="18px"
	onItemClick={() => dispatch('edit')}
/>
<ClickableIcon
	id="RowCollapse"
	iconSrc={RowCollapse}
	size="18px"
	onItemClick={() => $switchToBacklogMutation.mutate()}
/>
<ClickableIcon id="userAdmin" iconSrc={UserAdmin} size="18px" onItemClick={handleItemClick} />
<ClickableIcon id="calendar" iconSrc={Calendar} size="18px" onItemClick={handleItemClick} />
<ClickableIcon
	id="checkmark"
	iconSrc={CheckmarkOutline}
	size="18px"
	onItemClick={handleItemClick}
/>
