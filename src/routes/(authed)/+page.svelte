<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;
</script>

<svelte:head>
	<title>Welcome {user.email}</title>
</svelte:head>

<section>
	<div>
		<h1>You are Now Logged in</h1>
		<p>Hello {user.email}</p>
	</div>

	<form method="POST" action="?/logout">
		<button type="submit" name="logout" value="true">Logout</button>
	</form>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
	}

	form button {
		width: fit-content;
	}
</style>
