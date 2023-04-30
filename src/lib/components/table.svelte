<!-- Table Section -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Card -->
	<div class="flex flex-col">
		<div class="-m-1.5 overflow-x-auto">
			<div class="p-1.5 min-w-full inline-block align-middle">
				<div
					class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700"
				>
					<!-- Header -->
					<div
						class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700"
					>
						<div>
							<h2 class="text-xl font-semibold">Users</h2>
							<p class="text-sm text-gray-600 dark:text-gray-400">Add users, edit and more.</p>
						</div>

						<div>
							<div class="inline-flex gap-x-2">
								<a
									class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
									href="#"
								>
									View all
								</a>

								<a
									class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
									href="#"
								>
									Add user
								</a>
							</div>
						</div>
					</div>
					<!-- End Header -->

					<!-- Table -->
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-slate-800">
							<tr>
								<th scope="col" class="pl-6 py-3 text-left">
									<label for="hs-at-with-checkboxes-main" class="flex">
										<input type="checkbox" id="hs-at-with-checkboxes-main" />
										<span class="sr-only">Checkbox</span>
									</label>
								</th>

								<th scope="col" class="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide"> Name </span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide"> Position </span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide"> Status </span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide"> Portfolio </span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide"> Created </span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-right" />
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
							<tr>
								<td class="h-px w-px whitespace-nowrap">
									<div class="pl-6 py-3">
										<label for="hs-at-with-checkboxes-1" class="flex">
											<input type="checkbox" id="hs-at-with-checkboxes-1" />
											<span class="sr-only">Checkbox</span>
										</label>
									</div>
								</td>
								<td class="h-px w-px whitespace-nowrap">
									<div class="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
										<div class="flex items-center gap-x-3">
											<div class="grow">
												<span class="block text-sm font-semibold">Christina Bersh</span>
												<span class="block text-sm text-gray-500">christina@site.com</span>
											</div>
										</div>
									</div>
								</td>
								<td class="h-px w-72 whitespace-nowrap">
									<div class="px-6 py-3">
										<span class="block text-sm font-semibold">Director</span>
										<span class="block text-sm text-gray-500">Human resources</span>
									</div>
								</td>
								<td class="h-px w-px whitespace-nowrap">
									<div class="px-6 py-3">
										<span
											class="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
										>
											Active
										</span>
									</div>
								</td>
								<td class="h-px w-px whitespace-nowrap">
									<div class="px-6 py-3">
										<div class="flex items-center gap-x-3">
											<span class="text-xs text-gray-500">1/5</span>
											<div
												class="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
											>
												<div
													class="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200"
													role="progressbar"
													style="width: 25%"
													aria-valuenow="25"
													aria-valuemin="0"
													aria-valuemax="100"
												/>
											</div>
										</div>
									</div>
								</td>
								<td class="h-px w-px whitespace-nowrap">
									<div class="px-6 py-3">
										<span class="text-sm text-gray-500">28 Dec, 12:12</span>
									</div>
								</td>
								<td class="h-px w-px whitespace-nowrap">
									<div class="px-6 py-1.5">
										<a
											class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
											href="#"
										>
											Edit
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- End Table -->

					<!-- Footer -->
					<div
						class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700"
					>
						<div>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								<span class="font-semibold">6</span> results
							</p>
						</div>

						<div>
							<div class="inline-flex gap-x-2">
								<button
									type="button"
									class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
								>
									Prev
								</button>

								<button
									type="button"
									class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
								>
									Next
								</button>
							</div>
						</div>
					</div>
					<!-- End Footer -->
				</div>
			</div>
		</div>
	</div>
	<!-- End Card -->
</div>
<!-- End Table Section -->
