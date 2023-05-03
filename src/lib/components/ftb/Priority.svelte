<script>
	let topic = '';
	let description = '';
</script>

<div class="sticky bottom-0">
	<div class="align-bottom px-4 py-1 grid">
		<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
			<textarea
				bind:value={topic}
				class="resize-none bg-transparent border-0 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="1"
			/>
			<button class="variant-filled-primary">Send</button>
		</div>
	</div>
	<div class="align-bottom px-4 py-1 grid">
		<div class="input-group input-group-divider rounded-container-token">
			<textarea
				bind:value={description}
				class="resize-none bg-transparent border-0 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="4"
			/>
		</div>
	</div>
</div>
