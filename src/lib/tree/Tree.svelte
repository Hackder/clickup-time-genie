<script lang="ts">
	import type { Item } from './tree.types';
	import TreeItem from './TreeItem.svelte';

	export let items: Item[];

	function allChildrenSelected(item: Item): boolean {
		return item.children
			.flatMap((child) =>
				child.children.length === 0 ? child.selected : allChildrenSelected(child)
			)
			.every(Boolean);
	}

	function setChildrenSelected(item: Item, selected: boolean) {
		item.selected = selected;
		item.children.forEach((child) => setChildrenSelected(child, selected));
	}

	function changed(id: string) {
		function change(item: Item): Item {
			if (item.id === id) {
				setChildrenSelected(item, !item.selected);
				return {
					...item
				};
			} else {
				return {
					...item,
					children: item.children.map(change)
				};
			}
		}

		items = items.map(change);

		function update(item: Item): Item {
			if (item.children.length === 0) {
				return item;
			} else if (allChildrenSelected(item)) {
				return {
					...item,
					selected: true,
					children: item.children.map(update)
				};
			} else {
				return {
					...item,
					selected: false,
					children: item.children.map(update)
				};
			}
		}

		items = items.map(update);
	}

	export let selectedListIds: string[] = [];

	function getLists(item: Item): string[] {
		if (item.children.length === 0) {
			return item.selected ? [item.id] : [];
		} else {
			return item.children.flatMap(getLists);
		}
	}

	$: {
		selectedListIds = items.flatMap(getLists);
	}
</script>

<div class="flex flex-col gap-2">
	{#each items as item (item.id)}
		<TreeItem {item} on:changedId={(e) => changed(e.detail.id)} />
	{/each}
</div>
