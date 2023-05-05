<script lang="ts">
	let selTag: string = '🎁';
	let visible: boolean = false;
	type TagObject = {
		[key: string]: string;
	};
	const tagLbls: TagObject = {
		'💡': 'ideas',
		'⚠️': 'issues',
		'🔨': 'maintenance',
		'💰': 'finances',
		'🚀': 'innovation',
		'🐞': 'bugs',
		'🎁': 'features',
		'🔒': 'security',
		'🚩': 'attention',
		'📡': 'backend',
		'💾': 'database',
		'🖥️': 'desktop',
		'📱': 'mobile',
		'🌍': 'internationalization',
		'🎨': 'design',
		'📈': 'analytics',
		'🤖': 'automation'
	};
	// const tagLbls: TagObject = {
	// 	'📝': 'notes',
	// 	'💡': 'ideas',
	// 	'⌛': 'time-sensitive',
	// 	'📅': 'date-specific',
	// 	'📌': 'high-priority',
	// 	'✅': 'completed',
	// 	'⚠️': 'issues',
	// 	'🔨': 'maintenance',
	// 	'💰': 'finances',
	// 	'💬': 'communication',
	// 	'🔍': 'research',
	// 	'🐞': 'bugs',
	// 	'🎁': 'features',
	// 	'🔒': 'security',
	// 	'🚩': 'attention',
	// 	'🌐': 'frontend',
	// 	'📡': 'backend',
	// 	'💾': 'database',
	// 	'🖥️': 'desktop',
	// 	'📱': 'mobile',
	// 	'🌍': 'internationalization',
	// 	'🚀': 'performance',
	// 	'🎨': 'design',
	// 	'📈': 'analytics',
	// 	'🤖': 'automation'
	// };
	import { popup } from '@skeletonlabs/skeleton';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	let tagsPopupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'tagsPopup',
		placement: 'top'
	};
</script>

<span>Tags:</span>

<span class="chip" use:popup={tagsPopupSettings}>{selTag}{tagLbls[selTag]}</span>
