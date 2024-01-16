<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Add} from '@steeze-ui/carbon-icons';
    import {OverflowMenuHorizontal} from '@steeze-ui/carbon-icons';
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import TeamMemberAdd from './TeamMemberAdd.svelte'
  function openViewModal() {
		modalStore.trigger({
			type: 'component',
			component: 'viewForm'
		});
	}
</script>
<Modal components={{ viewForm: { ref: TeamMemberAdd } }} />
<a href="" class="card bg-initial card-hover overflow-hidden ">
    <div class="flex justify-center items-center">
        <div class="flex justify-center items-center">
            <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-8 h-8 m-2 text-black">T</div>
            <span class="">Hexcode</span>
        </div>
        <div class="ml-auto">
            <button class="btn-icon hover:variant-soft w-8 " on:click={openViewModal}><Icon src={Add} /></button>
            <button class="btn-icon hover:variant-soft w-8 me-2" ><Icon src={OverflowMenuHorizontal} /></button>
        </div>
    </div>
    <hr class="opacity-50" />
    <div class="flex justify-between items-center">
        <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-4 h-4 m-2 text-black text-xs">0</div>
        <span class="me-2 text-xs">8 August 2023</span>
    </div>
</a>
 