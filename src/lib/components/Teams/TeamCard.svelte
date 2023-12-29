<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Add} from '@steeze-ui/carbon-icons';
    import {OverflowMenuHorizontal} from '@steeze-ui/carbon-icons';
</script>
<a href="" class="card bg-initial card-hover overflow-hidden mt-2" >
    <div class="flex  items-center">
        <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-9 h-9 m-2 text-surface-800">TS</div>
        <span>Hexcode</span>
        <div class="ml-auto px-2">
            <button class="btn-icon hover:variant-soft w-8 "><Icon src={Add} /></button>
            <button class="btn-icon hover:variant-soft w-8"><Icon src={OverflowMenuHorizontal} /></button>
        </div>
        
    </div>
    <hr class="opacity-50" />
    <div class="flex justify-between items-center">
        <div class="flex-none rounded-full bg-surface-200 flex justify-center items-center w-5 h-5 m-2 text-xs text-surface-800">0</div>
        <span class="text-xs p-2">8 August 2023</span>
    </div>
</a> 