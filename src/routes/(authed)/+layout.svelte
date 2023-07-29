<script lang="ts">
	import '../../app.postcss';
	import { AppRailAnchor } from '@skeletonlabs/skeleton';
	import { AppRail } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Logout } from '@steeze-ui/carbon-icons';
	import { Roadmap } from '@steeze-ui/carbon-icons';
	import { Dashboard } from '@steeze-ui/carbon-icons';
	import { Report } from '@steeze-ui/carbon-icons';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	let activeRail = writable<string>();
	import { browser } from '$app/environment';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { invalidateAll } from '$app/navigation';
	const regionLead = 'flex justify-center items-center';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				onError: (err: any) => {
					const status = err.status;
					if (status === 401) {
						invalidateAll();
					}
				},
				retry: false
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<!-- App Shell -->
	<div id="appShell" class="flex min-h-full" data-testid="app-shell">
		<aside id="sidebar-left" class="">
			<AppRail>
				<AppRailAnchor {regionLead} href="/" name="tile-1" selected={$page.url.pathname === '/'}>
					<svelte:fragment slot="lead">
						<Icon src={Dashboard} size="24px" />
					</svelte:fragment>
				</AppRailAnchor>
				<!-- --- -->
				<AppRailAnchor
					{regionLead}
					bind:group={activeRail}
					href="/projects"
					name="tile-2"
					selected={$page.url.pathname === '/projects'}
				>
					<svelte:fragment slot="lead"><Icon src={Roadmap} size="24px" /></svelte:fragment>
					<span>Projects</span>
				</AppRailAnchor>
				<AppRailAnchor
					{regionLead}
					bind:group={activeRail}
					href="/reports"
					name="tile-3"
					selected={$page.url.pathname === '/reports'}
				>
					<svelte:fragment slot="lead"><Icon src={Report} size="24px" /></svelte:fragment>
					<span>Reports</span>
				</AppRailAnchor>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<div class="flex flex-col items-center space-y-6 mb-6">
						<LightSwitch />
						<form method="POST" action="/?/logout">
							<button class="btn-icon" type="submit">
								<Icon src={Logout} size="28" />
							</button>
						</form>
					</div>
				</svelte:fragment>
			</AppRail>
		</aside>
		<slot />
	</div>
</QueryClientProvider>
