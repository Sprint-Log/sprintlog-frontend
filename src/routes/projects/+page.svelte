<script lang="ts">
	let topic = '';
	let description = '';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	const flavorOptions: AutocompleteOption[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];
	function onPopupDemoSelect(event: any): void {
		inputPopupDemo = event.detail.label;
	}
	let popupSettings: PopupSettings = {
		event: 'focus',
		target: 'popupAutocomplete',
		placement: 'top'
	};
	let inputPopupDemo: string = '';
	import { Autocomplete } from '@skeletonlabs/skeleton';
</script>

<!-- ... -->
<div class="text-token w-full max-w-sm space-y-2">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={inputPopupDemo}
		placeholder="Search..."
		use:popup={popupSettings}
	/>
	<div data-popup="popupAutocomplete" class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto">
		<Autocomplete
			bind:input={inputPopupDemo}
			options={flavorOptions}
			on:selection={onPopupDemoSelect}
		/>
	</div>
</div>
