<script lang="ts">
	export let label: string;
	export let error: string | undefined;
</script>

<label class="flex flex-col gap-1">
	<span class="text-sm font-bold">{label}</span>
	<input
		class="px-3 py-2 rounded-lg border border-neutral-500 focus:border-black"
		{...$$restProps}
	/>
	{#if !!error}
		<small class="text-red-500">{error}</small>
	{/if}
</label>
