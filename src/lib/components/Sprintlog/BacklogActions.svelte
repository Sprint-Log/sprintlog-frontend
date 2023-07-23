<script lang="ts">
	import type { Sprintlog } from '$lib/types/sprintlog';
	import { useQueryClient, createMutation, createQuery } from '@tanstack/svelte-query';
	let client = useQueryClient();
	export let item: Sprintlog;
	import {
		getBacklogByPrjSlug,
		getProjects,
		getTaskByPrjSlug,
		switchToBacklog,
		switchToTask
	} from '$lib/api/sprintlog';
	import ClickableIcon from '$lib/components/Sprintlog/ClickableIcon.svelte';
	const handleItemClick = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};
	const toBacklog = function (event: any, item: any) {
		// client.invalidateQueries(['refetch-backlogs']);
	};
	import {
		CheckmarkOutline,
		OverflowMenuVertical,
		Upgrade,
		UserAdmin,
		Calendar,
		DownToBottom,
		UpToTop
	} from '@steeze-ui/carbon-icons';
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
	id="overflowMenu"
	iconSrc={OverflowMenuVertical}
	size="18px"
	onItemClick={handleItemClick}
/>
<ClickableIcon
	id="upToTop"
	iconSrc={UpToTop}
	size="18px"
	onItemClick={() => $switchToTaskMutation.mutate()}
/>
<ClickableIcon id="userAdmin" iconSrc={UserAdmin} size="18px" onItemClick={handleItemClick} />
<ClickableIcon id="calendar" iconSrc={Calendar} size="18px" onItemClick={handleItemClick} />
<ClickableIcon
	id="checkmark"
	iconSrc={CheckmarkOutline}
	size="18px"
	onItemClick={handleItemClick}
/>
