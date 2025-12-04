import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ItemService } from './items.service';
import { ItemRepository } from '@/configs/databases/repositories/item.repository';
import { NotFoundError } from 'routing-controllers';
import { createMock } from '@golevelup/ts-vitest';
import { createMockItem } from '@/helpers/test/mocks/item.mock';

describe('ItemService', () => {
  let service: ItemService;
  let repository: ItemRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = createMock<ItemRepository>();
    service = new ItemService(repository);
  });

  describe('constructor', () => {
    it('should create an instance with default services', () => {
      const defaultService = new ItemService();
      expect(defaultService).toBeDefined();
      expect(defaultService).toBeInstanceOf(ItemService);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const mockItems = createMockItem();
      vi.mocked(repository.findAll).mockReturnValue([mockItems]);

      const result = await service.findAll();
      expect(result).toEqual([mockItems]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item if found', async () => {
      const mockItem = createMockItem();
      vi.mocked(repository.findOneById).mockReturnValue(mockItem);

      const result = await service.findOne(1);
      expect(result).toEqual(mockItem);
      expect(repository.findOneById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError if not found and validate is true', async () => {
      vi.mocked(repository.findOneById).mockReturnValue(null);

      expect(() => service.findOne(1, { validate: true })).toThrow(
        NotFoundError,
      );
      expect(repository.findOneById).toHaveBeenCalledWith(1);
    });

    it('should return null if not found and validate is false', async () => {
      vi.mocked(repository.findOneById).mockReturnValue(null);

      const result = await service.findOne(1);
      expect(result).toBeNull();
      expect(repository.findOneById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createDto = { name: 'New Item' };
      const createdItem = createMockItem({ ...createDto });
      vi.mocked(repository.createItem).mockReturnValue(createdItem);

      const result = await service.create(createDto as any);
      expect(result).toEqual(createdItem);
      expect(repository.createItem).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateDto = { name: 'Updated Item' };
      const mockItem = createMockItem();

      vi.mocked(repository.findOneById).mockReturnValue(mockItem);
      vi.mocked(repository.update).mockReturnValue({
        ...mockItem,
        ...updateDto,
      });

      const result = await service.update(1, updateDto as any);

      expect(repository.findOneById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({
        ...mockItem,
        ...updateDto,
      });
    });

    it('should throw NotFoundError if item to update does not exist', async () => {
      vi.mocked(repository.findOneById).mockReturnValue(null);

      expect(() => service.update(1, {} as any)).toThrow(NotFoundError);
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      const mockItem = createMockItem();
      vi.mocked(repository.findOneById).mockReturnValue(mockItem);
      vi.mocked(repository.delete).mockReturnValue();

      await service.remove(1);

      expect(repository.findOneById).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError if item to remove does not exist', async () => {
      vi.mocked(repository.findOneById).mockReturnValue(null);

      expect(() => service.remove(1)).toThrow(NotFoundError);
    });
  });
});
