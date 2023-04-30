<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Category } from '@steeze-ui/carbon-icons';
	import { Roadmap } from '@steeze-ui/carbon-icons';
	import { Dashboard } from '@steeze-ui/carbon-icons';
	import { Report } from '@steeze-ui/carbon-icons';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	// export const activeRail = writable<number>(0);
	export const activeRail = writable<string>('/');
	// const storeValue: Writable<number> = writable(0);
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Scrumlog</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="https://collab.hexcode.tech" target="_blank" rel="noreferrer"> Collab </a>
				<a href="https://file.hexcode.tech" target="_blank" rel="noreferrer"> Drive </a>
				<a href="https://auth.hexcode.tech" target="_blank" rel="noreferrer"> Login </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={activeRail} gap="gap-y-4">
			<AppRailTile
				value="/"
				label="Dashboard"
				tag="a"
				href="/"
				class={'/' === $page.url.pathname ? '!bg-primary-500' : ''}
			>
				<Icon src={Dashboard} size="24px" />
			</AppRailTile>
			<AppRailTile
				label="Projects"
				value="/projects"
				tag="a"
				href="/projects"
				class={'/projects' === $page.url.pathname ? '!bg-primary-500' : ''}
			>
				<Icon src={Roadmap} size="24px" />
			</AppRailTile>
			<AppRailTile
				label="Tasks"
				value="/tasks"
				tag="a"
				href="/tasks"
				class={'/tasks' === $page.url.pathname ? '!bg-primary-500' : ''}
			>
				<Icon src={Category} size="24px" />
			</AppRailTile>
			<AppRailTile
				value="/reports"
				label="Reports"
				tag="a"
				href="/reports"
				class={'/reports' === $page.url.pathname ? '!bg-primary-500' : ''}
			>
				<Icon src={Report} size="24px" />
			</AppRailTile>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
