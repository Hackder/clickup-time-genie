<script lang="ts">
	import Datepicker from './Datepicker.svelte';

	let open = false;

	type Value = {
		from: Date;
		to: Date;
	};
	export let value: Value | null = null;
</script>

<svelte:window
	on:click={() => {
		open = false;
	}}
/>

<button
	class="relative px-6 py-2 border border-gray-300 rounded-lg"
	on:click|stopPropagation={() => (open = !open)}
>
	{#if value}
		{value.from.toLocaleDateString()} - {value.to.toLocaleDateString()}
	{:else}
		<span class="text-gray-300">Select date range</span>
	{/if}
	{#if open}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="absolute top-[110%] left-0 w-96 h-96" on:click|stopPropagation>
			<Datepicker bind:value />
		</div>
	{/if}
</button>
