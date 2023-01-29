<script lang="ts">
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let loading: boolean;
</script>

<button
	class="px-3 py-2.5 rounded-lg bg-purple-500 text-white font-bold hover:bg-purple-600 flex flex-row justify-center items-center gap-3 cursor-pointer"
  {...$$restProps}
>
	{#if !loading}
		<slot />
	{:else}
		<LoadingSpinner />
	{/if}
</button>
