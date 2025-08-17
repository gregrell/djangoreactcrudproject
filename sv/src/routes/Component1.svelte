<script>
	let formState = $state({
		name: '',
		birthday: '',
		step: 0,
		errorMess: ''
	});
</script>

<main>
	<div>
		{#if formState.step === 0}
			<label for="name">Name:</label>
			<input type="text" id="name" bind:value={formState.name} placeholder="Name" />
		{:else if formState.step === 1}
			<label for="birthday">Birthday:</label>
			<input type="date" id="birthday" bind:value={formState.birthday} />
		{/if}
		<button
			onclick={() => {
				formState.step--;
				formState.errorMess = '';
			}}
			disabled={formState.step === 0}>Previous</button
		>
		{#if formState.step < 2}
			<button
				onclick={() => {
					if (formState.name.trim() === '' && formState.step === 0) {
						formState.errorMess = 'Name cannot be empty';
					} else if (formState.birthday.trim() === '' && formState.step === 1) {
						formState.errorMess = 'Birthday cannot be empty';
					} else {
						formState.errorMess = '';
						formState.step++;
					}
				}}>Next Step</button
			>
		{/if}
		<p>Current Step: {formState.step}</p>
		{#if formState.errorMess}
			<p class="error">Error Message: {formState.errorMess}</p>
		{/if}

		{#if formState.step === 2}
			<p>Thank you for your submission!</p>
			<p>Name: {formState.name}</p>
			<p>Birthday: {formState.birthday}</p>
		{/if}
	</div>
</main>

<style>
	.error {
		color: red;
	}
</style>
