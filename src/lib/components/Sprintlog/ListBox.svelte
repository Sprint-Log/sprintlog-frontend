<div class="mt-2 px-6 flex items-center justify-between">
	<h5 class="text-xl font-bold leading-none"><slot name="title" /></h5>
	<slot name="action" />
</div>

<div class=" m-4 border border-surface-600 rounded-md min-h-0 overflow-y-scroll h-full">
	<slot />
</div>
