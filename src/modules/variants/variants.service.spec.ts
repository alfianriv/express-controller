import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VariantService } from './variants.service';
import { VariantRepository } from '@/configs/databases/repositories/variant.repository';
import { createMock } from '@golevelup/ts-vitest';
import { createMockVariant } from '@/helpers/test/mocks/variant.mock';

describe('VariantService', () => {
  let service: VariantService;
  let repository: VariantRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = createMock<VariantRepository>();
    service = new VariantService(repository);
  });

  describe('constructor', () => {
    it('should create an instance with default services', () => {
      const defaultService = new VariantService();
      expect(defaultService).toBeDefined();
      expect(defaultService).toBeInstanceOf(VariantService);
    });
  });

  describe('findAll', () => {
    it('should return an array of variants', async () => {
      const mockVariants = createMockVariant();
      vi.mocked(repository.findAll).mockReturnValue([mockVariants]);

      const result = await service.findAll();
      expect(result).toEqual([mockVariants]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a variant if found', async () => {
      const mockVariant = createMockVariant();
      vi.mocked(repository.findOneById).mockReturnValue(mockVariant);

      const result = await service.findOne(1);
      expect(result).toEqual(mockVariant);
      expect(repository.findOneById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a variant', async () => {
      const createDto = {
        name: 'New Variant',
        sku: 'SKU1',
        description: 'Desc',
        price: 100,
      };
      const createdVariant = createMockVariant({ ...createDto });
      vi.mocked(repository.createVariant).mockReturnValue(createdVariant);

      const result = await service.create(createDto);
      expect(result).toEqual(createdVariant);
      expect(repository.createVariant).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update a variant', async () => {
      const updateDto = { name: 'Updated Variant' };
      const updatedVariant = createMockVariant({ ...updateDto });
      vi.mocked(repository.update).mockReturnValue(updatedVariant);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedVariant);
      expect(repository.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a variant', async () => {
      vi.mocked(repository.delete).mockReturnValue();

      const result = await service.remove(1);
      expect(result).toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
