<script lang="ts">
	import { page } from '$app/stores';
	import CarretIcon from '$lib/CarretIcon.svelte';
	import type { TimeEntry } from '$lib/clickup/clickup.types';
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';
	import Tree from '$lib/tree/Tree.svelte';
	import type { PageData } from './$types';
	import DatepickerInput from '$lib/date/DatepickerInput.svelte';
	import TimeTable from './TimeTable.svelte';

	export let data: PageData;

	$: spaces = data.spaces;

	let selectedListIds: string[] = [];

	let value: { from: Date; to: Date } | null = null;
	$: from = value?.from.getTime();
	$: to = value?.to.getTime();

	$: timeEntries =
		$page.params.id &&
		from &&
		to &&
		(fetch(`/api/team/${$page.params.id}/timedata?from=${from}&to=${to}`).then((res) =>
			res.json()
		) as Promise<TimeEntry[]>);

	function filterTimeEntries(timeEntries: TimeEntry[], listIds: string[]): TimeEntry[] {
		return timeEntries.filter((timeEntry) =>
			listIds.includes(timeEntry.task_location.list_id)
		);
	}
</script>

<div class="container flex flex-row mx-auto gap-8 pt-8">
	<nav class="gap-8 flex flex-col">
		<a
			class="group px-3 py-2 font-bold flex flex-row items-center rounded-lg border border-gray-300 hover:border-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300"
			href="/"
		>
			<div class="rotate-90 transition-transform duration-300 group-hover:-translate-x-1">
				<CarretIcon />
			</div>
			<span class="w-full text-center pr-2">Back</span>
		</a>
		<Tree items={spaces} bind:selectedListIds />
	</nav>
	<main class="w-full h-full flex flex-col gap-8">
		<div class="z-10">
			<DatepickerInput bind:value />
		</div>
		{#await timeEntries}
			<LoadingSpinner />
		{:then timeEntries}
			<div>
				{#if Array.isArray(timeEntries) && from && to}
					<TimeTable timeEntries={filterTimeEntries(timeEntries, selectedListIds)} {from} {to} />
				{/if}
			</div>
		{:catch error}
			<p class="text-red-500 font-bold">{error.message}</p>
		{/await}
	</main>
</div>
