<script lang="ts">
	let columns: number[] = [];
</script>

<thead class="bg-gray-50 dark:bg-slate-800">
	<tr>
		<th scope="col" class="pl-6 py-3 text-left">
			<label for="hs-at-with-checkboxes-main" class="flex">
				<input type="checkbox" id="hs-at-with-checkboxes-main" />
				<span class="sr-only">Checkbox</span>
			</label>
		</th>
		{#each columns as column}
			<th scope="col" class="px-6 py-3 text-left">
				<div class="flex items-center gap-x-2">
					<span class="text-xs font-semibold uppercase tracking-wide">{column}</span>
				</div>
			</th>
		{/each}
		<th scope="col" class="px-6 py-3 text-right" />
	</tr>
</thead>
