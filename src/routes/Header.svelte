<script lang="ts">
	import { page } from '$app/stores';
	import AddPopup from './addPopup.svelte';
	export async function load(locals) {
		return {
			props: {
				user: locals.user
			}
		}
	};
	
	async function logout() {
		const res = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			window.location.replace('/login');
		}
	}
	let isModalOpen = false;

	function modalControl(value: boolean) {
		isModalOpen = value;
		console.log(isModalOpen);
	}
	export let user;

	

</script>

<header>
	
<h2>{user}'s TodoTitle</h2>
	<button on:click={()=>modalControl(true)}>추가</button>
</header>

{#if isModalOpen}
	<AddPopup modalControl={modalControl} />

{/if}

<style>
	body {
		position: relative;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #333;
		color: white;
	}
	
	
</style>
