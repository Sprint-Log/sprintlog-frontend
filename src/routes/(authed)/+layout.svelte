<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import '../../theme.greenslate.postcss';
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
	import { AppShell, AppBar, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Category, Login } from '@steeze-ui/carbon-icons';
	import { Roadmap } from '@steeze-ui/carbon-icons';
	import { Dashboard } from '@steeze-ui/carbon-icons';
	import { Report } from '@steeze-ui/carbon-icons';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	// export const activeRail = writable<number>(0);
	let activeRail = writable<string>();
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';
	import { browser } from '$app/environment';

	// const storeValue: Writable<number> = writable(0);
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { Skull } from 'lucide-svelte';
	const regionLead = 'flex justify-center items-center';

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
			<AppRail>
				<AppRailAnchor {regionLead} href="/">
					<svelte:fragment slot="lead">
						<Icon src={Dashboard} size="24px" />
					</svelte:fragment>
				</AppRailAnchor>
				<!-- --- -->
				<AppRailAnchor
					{regionLead}
					bind:group={activeRail}
					href="/projects"
					name="tile-1"
					value={0}
				>
					<svelte:fragment slot="lead"><Icon src={Roadmap} size="24px" /></svelte:fragment>
					<span>Projects</span>
				</AppRailAnchor>
				<AppRailAnchor
					{regionLead}
					bind:group={activeRail}
					href="/backlogs"
					name="tile-2"
					value={1}
				>
					<svelte:fragment slot="lead"><Icon src={Category} size="24px" /></svelte:fragment>
					<span>Backlogs</span>
				</AppRailAnchor>
				<AppRailAnchor {regionLead} bind:group={activeRail} href="/reports" name="tile-3" value={2}>
					<svelte:fragment slot="lead"><Icon src={Report} size="24px" /></svelte:fragment>
					<span>Reports</span>
				</AppRailAnchor>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<AppRailAnchor {regionLead} href="/" target="_blank" title="Account">
						<svelte:fragment slot="lead"><Icon src={Login} size="24px" /></svelte:fragment>
					</AppRailAnchor>
				</svelte:fragment>
			</AppRail>
		</svelte:fragment>
		<!-- Page Route Content -->
		<slot />
	</AppShell>
</QueryClientProvider>
