import { VariantModel } from '@/configs/databases/models/variant.model';

export const createMockVariant = (
  overrides?: Partial<VariantModel>,
): VariantModel => {
  return {
    id: 1,
    name: 'Test Variant',
    sku: 'SKU1',
    description: 'Desc',
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
};
