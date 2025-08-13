<script lang="ts">
	import Header from './Header.svelte';
	import Component1 from './Component1.svelte';
	let name = $state('Greg'); // normal state rune
	let full_name = $derived('Hello full name ' + name); //derived state rune
	let status: 'OPEN' | 'CLOSED' = $state('OPEN');

	function toggle() {
		status = status === 'OPEN' ? 'CLOSED' : 'OPEN';
	}
</script>

<!-- <Header {name} fake_name="Wes"/> -->
<!-- <input type="text" bind:value={name} />

<p>The store is now {status}</p>
<button onclick={toggle}>Toggle Status</button>
<p>{full_name}</p> -->

<Component1 />
