<script>
	let formState = $state({
		name: '',
		step: 0,
		errorMess: ''
	});
</script>

<main>
	<div>
		{#if formState.step === 0}
			<label for="name">Name:</label>
			<input type="text" id="name" bind:value={formState.name} placeholder="Name" />
		{/if}
		<button onclick={() => formState.step--} disabled={formState.step === 0}>Previous</button>

		<button
			onclick={() => {
				if (formState.name.trim() === '') {
					formState.errorMess = 'Name cannot be empty';
				} else {
					formState.errorMess = '';
					formState.step++;
				}
			}}>Next Step</button
		>
		<p>Current Step: {formState.step}</p>
		<p>Error Message: {formState.errorMess}</p>
	</div>
</main>

<style>
</style>
