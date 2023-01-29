<script lang="ts">
	import CarretIcon from '$lib/CarretIcon.svelte';
	import {
		format,
		subMonths,
		addMonths,
		startOfMonth,
		endOfMonth,
		getDaysInMonth,
		subDays,
		addDays,
		isBefore,
		isAfter,
		isToday
	} from 'date-fns';
	import classNames from 'classnames';

	type Value = {
		from: Date;
		to: Date;
	};

	export let value: Value | null = null;

	const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

	let anchorDate = new Date();
	$: anchorDateText = format(anchorDate, 'MMMM yyyy');

	type DateEntry = {
		date: number;
		inCurrentMonth: boolean;
	};

	function getDates(anchor: Date): DateEntry[] {
		const monthStart = startOfMonth(anchor);
		const daysInMonth = getDaysInMonth(monthStart);
		const offset = days.indexOf(format(monthStart, 'EEEEEE'));
		const start = subDays(monthStart, offset);

		const endOffset = days.length - days.indexOf(format(endOfMonth(anchor), 'EEEEEE')) - 1;

		const dates: DateEntry[] = [];
		for (let i = 0; i < daysInMonth + offset + endOffset; i++) {
			const date = addDays(start, i);

			dates.push({
				date: date.getTime(),
				inCurrentMonth: date.getMonth() === anchor.getMonth()
			});
		}

		return dates;
	}

	$: dates = getDates(anchorDate);

	let start: number | null = null;
	let end: number | null = null;

	$: {
		if (start && end) {
			value = {
				from: new Date(start),
				to: new Date(end)
			};
		}
	}

	function setFromNewValue(value: Value) {
		start = value.from.getTime();
		end = value.to.getTime();
	}

	$: value && setFromNewValue(value);
</script>

<div class="border bg-white isolate border-gray-300 rounded-lg px-6 py-4 flex flex-col gap-4">
	<div class="flex flex-row justify-between">
		<button
			class="p-1 hover:bg-gray-100 rounded"
			on:click={() => {
				anchorDate = subMonths(anchorDate, 1);
			}}
		>
			<div class="rotate-90">
				<CarretIcon />
			</div>
		</button>
		<p>{anchorDateText}</p>
		<button
			class="p-1 hover:bg-gray-100 rounded"
			on:click={() => {
				anchorDate = addMonths(anchorDate, 1);
			}}
		>
			<div class="-rotate-90">
				<CarretIcon />
			</div>
		</button>
	</div>
	<div class="flex flex-col">
		<div class="grid grid-cols-7 gap-1">
			{#each days as day}
				<div class="flex flex-col items-center">
					<span class="font-bold text-gray-400">{day}</span>
				</div>
			{/each}
			{#each dates as entry}
				{@const selected = start === entry.date || end === entry.date}
				<button
					class={classNames('relative flex flex-col items-center p-1 rounded', {
						'bg-purple-500 text-white hover:bg-purple-600': selected,
						'hover:bg-gray-200': !selected,
						'rounded-r-none': entry.date === start && end !== null,
						'rounded-l-none': entry.date === end && start !== null
					})}
					on:click={() => {
						if (start !== null && end === null) {
							end = entry.date;
							if (isBefore(end, start)) {
								const tmp = start;
								start = end;
								end = tmp;
							}
						} else {
							start = entry.date;
							end = null;
						}
					}}
				>
					<span
						class={classNames({
							'text-gray-300': !entry.inCurrentMonth,
							'font-bold underline': isToday(entry.date)
						})}
					>
						{format(entry.date, 'd')}
					</span>
					{#if start && end && isBefore(entry.date, end) && isAfter(entry.date, start)}
						<div
							class="absolute w-[calc(100%+0.5rem)] -left-1 top-0 h-full rounded bg-gray-100 -z-10"
						/>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>
