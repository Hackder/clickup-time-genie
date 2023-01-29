<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Item } from './tree.types';

	const dispatch = createEventDispatcher<{
		changedId: {
			id: string;
		};
	}>();

	export let item: Item;

	type StateType = 'checked' | 'unchecked' | 'indeterminate';
	let state: StateType = 'checked';
	const classes = {
		checked: 'text-white bg-purple-500 border-purple-500',
		unchecked: 'text-black bg-white border-gray-300',
		indeterminate: 'text-white bg-purple-500 border-purple-500'
	} satisfies Record<StateType, string>;

	function someChildSelected(item: Item): boolean {
		return item.children
			.flatMap((child) => (child.children.length === 0 ? child.selected : someChildSelected(child)))
			.some(Boolean);
	}

	function allChildrenSelected(item: Item): boolean {
		return item.children
			.flatMap((child) =>
				child.children.length === 0 ? child.selected : allChildrenSelected(child)
			)
			.every(Boolean);
	}

	$: {
		if (item.children.length === 0) {
			state = item.selected ? 'checked' : 'unchecked';
		} else if (allChildrenSelected(item)) {
			state = 'checked';
		} else if (someChildSelected(item)) {
			state = 'indeterminate';
		} else {
			state = 'unchecked';
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-row items-center gap-2">
		<button
			class={`w-4 h-4 rounded border ${classes[state]}`}
			on:click={() => dispatch('changedId', { id: item.id })}
		>
			{#if state === 'checked'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="text-white w-full h-full"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="4"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			{:else if state === 'indeterminate'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="text-white w-full h-full"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 12L19 12" />
				</svg>
			{/if}
		</button>
		<p>{item.name}</p>
	</div>
	<div class="flex flex-col gap-2 pl-8">
		{#each item.children as child (child.id)}
			<svelte:self
				item={child}
				on:changedId={(e) => {
					dispatch('changedId', e.detail);
				}}
			/>
		{/each}
	</div>
</div>
