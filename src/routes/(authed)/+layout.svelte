<script lang="ts">
  import '../../app.postcss';
  import { AppRailAnchor } from '@skeletonlabs/skeleton';
  import { AppRail } from '@skeletonlabs/skeleton';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Logout } from '@steeze-ui/carbon-icons';
  import { Roadmap } from '@steeze-ui/carbon-icons';
  import { Report } from '@steeze-ui/carbon-icons';
  import { UserAvatar } from '@steeze-ui/carbon-icons';
  import { User } from '@steeze-ui/carbon-icons';
  import { UserMultiple } from '@steeze-ui/carbon-icons';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { modalStore, LightSwitch, storePopup } from '@skeletonlabs/skeleton';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { goto, invalidateAll } from '$app/navigation';
  import { logout } from '$lib/api/auth';
  import { redirect } from '@sveltejs/kit';

  export let data;
  const regionLead = 'flex justify-center items-center';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let delForm: HTMLFormElement | null = null;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        onError: (err: any) => {
          const status = err.status;
          if (status === 401) {
            invalidateAll();
          }
        }
        // retry: false
      }
    }
  });
  let activeRail = writable<string>();

  async function handleLogout(e: Event) {
    e.preventDefault();

    modalStore.trigger({
      type: 'confirm',
      title: 'Please Confirm',
      body: 'Are you sure you want to logout?',
      response: async (confirmed: boolean) => {
        if (confirmed) {
          redirect(302, '/login');
          await logout();
        }
      }
    });
  }
</script>

<QueryClientProvider client={queryClient}>
  <!-- App Shell -->
  <div id="appShell" class="flex min-h-full" data-testid="app-shell">
    <aside id="sidebar-left">
      <AppRail>
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
        {#if data.user.isSuperuser}
          <AppRailAnchor
            {regionLead}
            bind:group={activeRail}
            href="/users"
            name="tile-3"
            selected={$page.url.pathname === '/users'}
          >
            <svelte:fragment slot="lead"><Icon src={User} size="24px" /></svelte:fragment>
            <span>Users</span>
          </AppRailAnchor>
          <AppRailAnchor
            {regionLead}
            bind:group={activeRail}
            href="/teams"
            name="tile-3"
            selected={$page.url.pathname === '/teams'}
          >
            <svelte:fragment slot="lead"><Icon src={UserMultiple} size="24px" /></svelte:fragment>
            <span>Teams</span>
          </AppRailAnchor>
        {/if}
        <AppRailAnchor
          {regionLead}
          bind:group={activeRail}
          href="/profile"
          name="tile-3"
          selected={$page.url.pathname === '/profile'}
        >
          <svelte:fragment slot="lead"><Icon src={UserAvatar} size="24px" /></svelte:fragment>
          <span>Profile</span>
        </AppRailAnchor>
        <!-- --- -->
        <svelte:fragment slot="trail">
          <div class="flex flex-col items-center space-y-6 mb-6">
            <LightSwitch />
            <form bind:this={delForm} method="POST" action="" on:submit={handleLogout}>
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
