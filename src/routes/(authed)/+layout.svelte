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
	import { Category, Login, Logout } from '@steeze-ui/carbon-icons';
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
	<div id="appShell" class="w-full h-full flex flex-col overflow-hidden" data-testid="app-shell">
		<div class="flex-auto w-full h-full flex overflow-hidden">
			<div class="flex-auto w-full h-full flex overflow-hidden">
				<aside id="sidebar-left" class="flex-none overflow-x-hidden overflow-y-auto w-auto">
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
							href="/reports"
							name="tile-3"
							value={2}
						>
							<svelte:fragment slot="lead"><Icon src={Report} size="24px" /></svelte:fragment>
							<span>Reports</span>
						</AppRailAnchor>
						<!-- --- -->
						<svelte:fragment slot="trail">
							{#if data.user}
								<AppRailAnchor {regionLead} href="/login" target="_blank" title="Account">
									<svelte:fragment slot="lead"><Icon src={Logout} size="24px" /></svelte:fragment>
								</AppRailAnchor>
							{:else}
								<AppRailAnchor {regionLead} href="/login" target="_blank" title="Account">
									<svelte:fragment slot="lead"><Icon src={Login} size="24px" /></svelte:fragment>
								</AppRailAnchor>
							{/if}
						</svelte:fragment>
					</AppRail>
				</aside>
				<slot />
			</div>
		</div>
	</div>
	<!--<+layout>--><!--<Layout>-->
</QueryClientProvider>
