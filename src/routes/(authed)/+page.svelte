<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;
</script>

<svelte:head>
	<title>Welcome {user.email}</title>
</svelte:head>
<div class="container h-full mx-auto flex flex-col justify-center items-center space-y-5">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>You are Now Logged in
		</span>
	</h1>
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>Weclome to Sprintlog
		</span>
	</h1>
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
		>
			{user.email}</span
		>
	</h1>
	<form method="POST" action="?/logout">
		<button type="submit" name="logout" value="true">Logout</button>
	</form>
</div>
