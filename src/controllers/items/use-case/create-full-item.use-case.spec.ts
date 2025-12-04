import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateFullItemUseCase } from './create-full-item.use-case';
import { ItemService } from '@/modules/items/items.service';
import { VariantService } from '@/modules/variants/variants.service';
import { createMock } from '@golevelup/ts-vitest';
import { createMockItem } from '@/helpers/test/mocks/item.mock';
import { createMockVariant } from '@/helpers/test/mocks/variant.mock';

describe('CreateFullItemUseCase', () => {
  let useCase: CreateFullItemUseCase;
  let itemService: ItemService;
  let variantService: VariantService;

  beforeEach(() => {
    vi.clearAllMocks();
    itemService = createMock<ItemService>();
    variantService = createMock<VariantService>();
    useCase = new CreateFullItemUseCase(itemService, variantService);
  });

  describe('constructor', () => {
    it('should create an instance with default services', () => {
      const defaultUseCase = new CreateFullItemUseCase();
      expect(defaultUseCase).toBeDefined();
      expect(defaultUseCase).toBeInstanceOf(CreateFullItemUseCase);
    });
  });

  describe('execute', () => {
    it('should create item and variant', async () => {
      const createDto = {
        name: 'Full Item',
        sku: 'SKU',
        description: 'Desc',
        price: 100,
      };

      const mockItem = createMockItem();
      const mockVariant = createMockVariant();

      vi.mocked(itemService.create).mockReturnValue(mockItem);
      vi.mocked(variantService.create).mockReturnValue(mockVariant);

      const result = await useCase.execute(createDto);

      expect(itemService.create).toHaveBeenCalledWith({
        name: createDto.name,
        description: createDto.description,
      });
      expect(variantService.create).toHaveBeenCalledWith({
        sku: createDto.sku,
        name: createDto.name,
        description: createDto.description,
        price: createDto.price,
      });
      expect(result).toEqual({ ...mockItem, variant: mockVariant });
    });
  });
});
