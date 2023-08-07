<script lang="ts">
	import type { ProjectItems } from '$lib/types/sprintlog';
	export let items: ProjectItems[];
</script>

<nav aria-label="Breadcrumb">
	<ol class="inline-flex items-center space-x-1 md:space-x-3 sm:mb-0">
		{#each items as item, index}
			<li>
				<div class="flex items-center">
					{#if item.href}
						<a href={item.href} class="!no-underline hover:!underline !text-surface-900-50-token"
							>{item.text}</a
						>
					{:else}
						<span class="ml-1 text-base font-medium text-gray-700 md:ml-2 dark:text-gray-400"
							>{item.text}</span
						>
					{/if}
				</div>
			</li>
			{#if index !== items.length - 1}
				<li aria-hidden="true">
					<div class="flex items-center">
						<span class="mx-2 text-gray-400">/</span>
					</div>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
