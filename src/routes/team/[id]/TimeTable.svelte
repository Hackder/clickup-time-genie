<script lang="ts">
	import type { TimeEntry } from '$lib/clickup/clickup.types';
	import { eachDayOfInterval, isSameDay } from 'date-fns';

	export let from: number;
	export let to: number;
	export let timeEntries: TimeEntry[];

	$: days = eachDayOfInterval({ start: from, end: to });

	$: data = days.map((day) => {
		const entries = timeEntries.filter((entry) => isSameDay(Number(entry.start), day));

		return {
			date: day,
			tasks: [...new Set(entries.map((entry) => entry.task.name))],
			duration: entries.reduce((acc, entry) => acc + Number(entry.duration), 0)
		};
	});
</script>

<table class="table-auto">
	<thead class="text-xs uppercase font-bold text-gray-500">
		<tr>
			<th scope="col" class="text-left px-6 py-3">Date</th>
			<th scope="col" class="text-left px-6 py-3">Tasks</th>
			<th scope="col" class="text-left px-6 py-3">Duration (hours)</th>
		</tr>
	</thead>
	<tbody>
		{#each data as timeEntry (timeEntry.date.getTime())}
			<tr class="border-b">
				<td class="px-6 py-2">{timeEntry.date.toLocaleDateString()}</td>
				<td class="px-6 py-2">{timeEntry.tasks.join(' + ')}</td>
				<td class="px-6 py-2">
					{(Math.ceil((timeEntry.duration * 4) / 1000 / 60 / 60) / 4).toFixed(2)}
					<span class="select-none">h</span>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
