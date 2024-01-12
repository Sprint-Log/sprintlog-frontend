<script>
  import ActiveProjectCard from '$lib/components/Users/ActiveProjectCard.svelte';
  import TaskListBox from '$lib/components/Sprintlog/TaskListBox.svelte';
</script>
<div class="flex flex-col mt-2 px-4">
  <section class="">
    <h5 class="mb-2 font-semibold">Active Projects</h5>
    <div class="grid grid-cols-4 gap-2">
      <ActiveProjectCard></ActiveProjectCard>
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
  <section class="mb-12">
    <h5 class="mb-2 font-semibold">SprintLog Tasks</h5>
    <div class="grid h-full max-h-screen overflow-y-scroll">
      <div class="px-4 rounded h-full">
      <TaskListBox>
        <!-- listitem from listitemedit add(ref:authed/sprintlogs/pj/slug) -->
      </TaskListBox>
      </div>
    </div>
  </section>
</div>