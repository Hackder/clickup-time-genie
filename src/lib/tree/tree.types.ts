export type ItemType = 'space' | 'folder' | 'list';
export type Item<T extends ItemType = ItemType> = {
  id: string;
  type: T;
  name: string;
  selected: boolean;
  children: Item[];
};
