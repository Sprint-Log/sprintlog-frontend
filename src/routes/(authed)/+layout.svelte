<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import '../../theme.greenslate.postcss';
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
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
	export const activeRail = writable<string>();
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';
	import { browser } from '$app/environment';

	// const storeValue: Writable<number> = writable(0);
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data: LayoutData;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<!-- App Shell -->
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">Scrumlog</strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<LightSwitch />
					<a href="https://collab.hexcode.tech" target="_blank" rel="noreferrer"> Collab </a>
					<a href="https://file.hexcode.tech" target="_blank" rel="noreferrer"> Drive </a>
					<a href="https://auth.hexcode.tech" target="_blank" rel="noreferrer"> Login </a>
					{#if data.user}
						<a href="/">{data.user.email}</a>
						<form method="POST" action="/?/logout">
							<button type="submit" name="logout" value="true">Logout</button>
						</form>
					{:else}
						<a href="/signup">Sign Up</a>
						<a href="/login">Log In</a>
					{/if}
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
					label="Backlogs"
					value="/backlogs"
					tag="a"
					href="/backlogs"
					class={'/backlogs' === $page.url.pathname ? '!bg-primary-500' : ''}
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
</QueryClientProvider>
