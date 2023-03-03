<script lang="ts">
	import { navigating } from '$app/stores';
	import type { PageData } from './$types';
	import TeamCard from './TeamCard.svelte';

	export let data: PageData;
</script>

<main class="container flex flex-row justify-center items-center h-full mx-auto">
	<div class="flex flex-col gap-3">
		<h1 class="text-3xl font-bold text-center">Teams</h1>
		{#each data.teams as team (team.id)}
			<a href={`/team/${team.id}`} class:pointer-events-none={Boolean($navigating)}>
				<TeamCard {team} />
			</a>
		{/each}
	</div>
</main>
