import { ItemModel } from '@/configs/databases/models/items.model';

export const createMockItem = (overrides?: Partial<ItemModel>): ItemModel => {
  return {
    id: 1,
    name: 'Test Item',
    description: 'Desc',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
};
