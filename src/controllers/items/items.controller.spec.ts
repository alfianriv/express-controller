import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ItemController } from './items.controller';
import { ItemService } from '@/modules/items/items.service';
import { CreateFullItemUseCase } from './use-case/create-full-item.use-case';
import { createMock } from '@golevelup/ts-vitest';
import { createMockItem } from '@/helpers/test/mocks/item.mock';
import { createMockVariant } from '@/helpers/test/mocks/variant.mock';

describe('ItemController', () => {
  let controller: ItemController;
  let itemService: ItemService;
  let createFullItemUseCase: CreateFullItemUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    itemService = createMock<ItemService>();
    createFullItemUseCase = createMock<CreateFullItemUseCase>();
    controller = new ItemController(itemService, createFullItemUseCase);
  });

  describe('constructor', () => {
    it('should create an instance with default services', () => {
      const defaultController = new ItemController();
      expect(defaultController).toBeDefined();
      expect(defaultController).toBeInstanceOf(ItemController);
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const mockItems = createMockItem();
      vi.mocked(itemService.findAll).mockReturnValue([mockItems]);

      const result = await controller.findAll();
      expect(result).toEqual([mockItems]);
      expect(itemService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item by id', async () => {
      const mockItem = createMockItem();
      vi.mocked(itemService.findOne).mockReturnValue(mockItem);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockItem);
      expect(itemService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a full item using use case', async () => {
      const createDto = {
        name: 'Item',
        sku: 'SKU',
        description: 'Desc',
        price: 100,
      };
      const expectedResult = {
        ...createMockItem({ ...createDto }),
        variant: createMockVariant({ ...createDto }),
      };
      vi.mocked(createFullItemUseCase.execute).mockReturnValue(expectedResult);

      const result = await controller.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(createFullItemUseCase.execute).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateDto = {
        name: 'Updated Item',
        description: 'Desc',
        price: 100,
      };
      const expectedResult = {
        ...createMockItem({ ...updateDto }),
        variant: createMockVariant({ ...updateDto }),
      };
      vi.mocked(itemService.update).mockReturnValue(expectedResult);

      const result = await controller.update(1, updateDto);
      expect(result).toEqual(expectedResult);
      expect(itemService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      vi.mocked(itemService.remove).mockReturnValue(undefined);

      const result = await controller.remove(1);
      expect(result).toBeUndefined();
      expect(itemService.remove).toHaveBeenCalledWith(1);
    });
  });
});
