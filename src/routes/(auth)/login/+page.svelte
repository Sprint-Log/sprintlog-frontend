<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Eye, EyeSlash } from '@steeze-ui/heroicons';

	export let form: ActionData;
	let pwShow = false;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="grid place-items-center h-full p-8">
	<div class="bg-surface-800 p-8 rounded-lg w-full max-w-lg">
		<h3 class="text-center mb-4">Login</h3>
		<form class="space-y-4" method="post" use:enhance action="">
			<label class="label">
				<span>Email</span>
				<input
					type="email"
					name="email"
					class="input variant-form-material"
					placeholder="Enter your email"
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
					<input
						name="password"
						type={pwShow ? 'text' : 'password'}
						placeholder="Enter your password"
					/>
					<button
						class="variant-filled-surface btn-icon rounded-none"
						type="button"
						on:click={() => (pwShow = !pwShow)}
					>
						{#if pwShow}
							<Icon src={EyeSlash} size="24" />
						{:else}
							<Icon src={Eye} size="24" />
						{/if}
					</button>
				</div>
			</label>
			{#if form?.error}
				<p class="text-error-400">{form.error}</p>
			{/if}
			<button class="btn variant-filled-primary" type="submit">Login</button>
		</form>
	</div>
</main>

<!-- <main class="container h-full mx-auto my-auto">
	<div class="flex flex-col items-center justify-center mx-auto md:h-screen pt:mt-0">
		<a
			href="https://flowbite-admin-dashboard.vercel.app/"
			class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
		>
			<img
				src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
				class="mr-4 h-11"
				alt="FlowBite Logo"
			/>
			<span>SprintLog</span>
		</a>
		<div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
			<form method="post" use:enhance class="mt-8 space-y-6" action="#">
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Your email</label
					>
					<input
						type="email"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="name@company.com"
						required
					/>
				</div>
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Your password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						required
					/>
				</div>
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="remember"
							aria-describedby="remember"
							name="remember"
							type="checkbox"
							class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
							required
						/>
					</div>

					{#if form?.error}
						<div class="notice error">
							{form.error}
						</div>
					{/if}
					<div class="ml-3 text-sm">
						<label for="remember" class="font-medium text-gray-900 dark:text-white"
							>Remember me</label
						>
					</div>
					<a href="#" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
						>Lost Password?</a
					>
				</div>
				<button
					type="submit"
					class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Login to your account</button
				>
			</form>
		</div>
	</div>
</main> -->
