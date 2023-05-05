<script lang="ts">
	export let selTag: string = '';
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

	function setTag(newTag: string) {
		selTag = newTag;
	}
	function setVisible() {
		visible = !visible;
	}
</script>

{#each Object.entries(tagLbls) as [tag, label]}
	<span
		class="chip {selTag === tag ? 'variant-filled-success' : 'variant-soft'}"
		on:click={() => {
			setTag(tag);
		}}
		on:keypress
	>
		{#if selTag === tag}<span>{tagLbls[tag]}</span>{/if}

		<span>{tag}</span>
	</span>
{/each}
