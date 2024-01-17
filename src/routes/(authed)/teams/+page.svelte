<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Add} from '@steeze-ui/carbon-icons';
    import {Search} from '@steeze-ui/carbon-icons';
    import TeamForm from '$lib/components/Teams/TeamForm.svelte';
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    import BreadcrumbTeam from '$lib/components/Teams/BreadcrumbTeam.svelte';
  import TeamCard from '$lib/components/Teams/TeamCard.svelte';
    $: breadCrumb = [{ text: 'Home', href: '/' }];
    function openModal() {
		modalStore.trigger({
			type: 'component',
			component: 'form'
		});
	}

</script>
    <Modal components={{ form: { ref: TeamForm } }} />
<div class="w-full">
        <nav class="px-6 py-2 bg-surface-100-800-token flex justify-between ">
          <BreadcrumbTeam items={breadCrumb} />
          <form action="" class="">
            <div class="relative">
              <input type="text" class="input block h-7 ps-8" placeholder="Search" required />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                <div class="w-4 mx-2">
                  <Icon src={Search} />
                </div>
              </div>
            </div>
          </form>
        </nav>
<div class="flex">
    <div class="basis-1/3 px-1 bg-surface-800 border-r h-screen border-surface-200 border-opacity-25 ">
		<div class="flex items-center mb-2 ">
            <h2 class="font-semibold">Teams</h2>
		    <button class="btn-icon hover:variant-soft" on:click={openModal}><Icon src={Add} /></button>
        </div>
        <div class="flex flex-col items-center justify-center h-screen">
          <button class=" flex text-2xl btn border border-surface-200 rounded opacity-30" on:click={openModal}>
              Create Team <div class="w-9"><Icon src={Add} /></div>
          </button>
        </div>
        <div class=" h-screen overflow-y-scroll scroll-smooth hide-scrollbar">
          <div class="grid gap-2 p-2">
              <!-- team card add -->
          </div>
        </div>
        
	</div>
    <div class="basis-4/5 mb-8 space-x-4 max-h-screen overflow-y-scroll ">
        
       <div class="flex flex-col items-center justify-center h-screen">
        <p class="text-3xl border-surface-200 opacity-30 font-semibold">Please select a team</p>
       </div>
        <!-- teams/[slug]/+page.svelte -->
	</div>
</div>
</div>
