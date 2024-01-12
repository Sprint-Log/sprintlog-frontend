<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import { Document } from '@steeze-ui/carbon-icons';
    import { CheckmarkOutline } from '@steeze-ui/carbon-icons';
    import { Calendar } from '@steeze-ui/carbon-icons';
    import { Alarm } from '@steeze-ui/carbon-icons';
</script>
<a href="" class="card bg-initial card-hover overflow-hidden ">
    <h6 class="p-2 font-medium">SprintLog</h6>
    <div class="flex justify-between">
      <div class="flex text-xs justify-center items-end">
        <div class="w-5 mx-1"><Icon src={Document} /></div>
        <span >Tasks Assigned</span>
      </div>
      <div class="w-12 mx-2 rounded-full border border-surface-200 text-center text-sm">
        6
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <div class="flex text-xs justify-center items-end">
        <div class="w-5 mx-1"><Icon src={CheckmarkOutline} /></div>
        <span>Completed Tasks</span>
      </div>
      <div class="w-12 mx-2 rounded-full border border-success-800 text-center text-sm">
        6
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <div class="flex text-xs justify-center items-end">
        <div class="w-5 mx-1"><Icon src={Calendar} /></div>
        <span>Remaining Tasks</span>
      </div>
      <div class="w-12 mx-2 rounded-full border border-yellow-400 text-center text-sm">
        3
      </div>
    </div>
    <div class="flex justify-between my-2">
      <div class="flex text-xs justify-center items-end">
        <div class="w-5 mx-1"><Icon src={Alarm} /></div>
        <span>Tasks Due</span>
      </div>
      <div class="w-12 mx-2 rounded-full border border-red-800 text-center text-sm">
        3
      </div>
    </div>
  </a>