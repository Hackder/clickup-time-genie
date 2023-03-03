<script lang="ts">
	import CarretIcon from '$lib/CarretIcon.svelte';
	import type { Team } from '$lib/clickup/clickup.types';
	import { colorFromHex, forgroundBlack } from '$lib/utils';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';

	export let team: Team;

	$: black = forgroundBlack(colorFromHex(team.color));
	$: textColor = black ? 'black' : 'white';
</script>

<div
	style="--color: {team.color}; --text-color: {textColor}"
	class={`group flex flex-row items-center gap-4 transition-colors overflow-hidden duration-500 py-4 px-5 rounded-lg bg-white border border-neutral-300 hover:text-[var(--text-color)]`}
>
	<div
		class="w-6 h-6 rounded group-hover:scale-[20] transition-transform duration-700 bg-[var(--color)]"
	/>
	<p class="font-bold text-lg z-10">{team.name}</p>
	{#if $navigating?.to?.url.pathname === `/team/${team.id}`}
		<div class="ml-auto">
			<LoadingSpinner />
		</div>
	{:else}
		<div class="ml-auto -rotate-90 group-hover:translate-x-2 transition-transform duration-500">
			<CarretIcon />
		</div>
	{/if}
</div>
