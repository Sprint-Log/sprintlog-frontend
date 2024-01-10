<script>
import { Document } from '@steeze-ui/carbon-icons';
  import { CheckmarkOutline } from '@steeze-ui/carbon-icons';
  import { Calendar } from '@steeze-ui/carbon-icons';
  import { Alarm } from '@steeze-ui/carbon-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
</script>
<div class="flex flex-col mt-2 h-full ">
    <section class="flex-basis-1/2 h-[50%] me-4">
      <h5 class="mb-2 font-semibold">Active Projects</h5>
      <div class="grid grid-cols-4 gap-2">
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
      </div>
      <div class="flex justify-end items-end py-2">
        <nav class="card bg-initial card-hover inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
          <a href="#" class="!no-underline hover:!underline !text-surface-900-50-token text-sm relative inline-flex items-center rounded-l-md px-2 py-2 border-r border-surface-500">
            <span >Previous</span>
          </a>
          <a href="#" aria-current="page" class="!no-underline hover:!underline !text-surface-900-50-token relative z-10 inline-flex items-center px-4 py-2 text-sm border-r border-surface-500">1</a>
          <a href="#" class="!no-underline hover:!underline !text-surface-900-50-token relative inline-flex items-center px-4 py-2 text-sm border-r border-surface-500">2</a>
          <a href="#" class="!no-underline hover:!underline !text-surface-900-50-token relative  items-center px-4 py-2 text-sm border-r border-surface-500">3</a>
          <a href="#" class="!no-underline hover:!underline !text-surface-900-50-token relative text-sm inline-flex items-center rounded-r-md px-2 py-2 ">
            <span >Next</span>
          </a>
        </nav>
      </div>
    </section>
    <h5 class="mb-2 font-semibold">SprintLog Taks</h5>
    <section class="grid h-full max-h-screen overflow-y-scroll">
      
    </section>

  </div>