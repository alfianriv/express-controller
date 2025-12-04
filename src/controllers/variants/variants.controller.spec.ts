import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VariantController } from './variants.controller';
import { VariantService } from '@/modules/variants/variants.service';
import { createMock } from '@golevelup/ts-vitest';
import { createMockVariant } from '@/helpers/test/mocks/variant.mock';

describe('VariantController', () => {
  let controller: VariantController;
  let service: VariantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createMock<VariantService>();
    controller = new VariantController(service);
  });

  describe('constructor', () => {
    it('should create an instance with default services', () => {
      const defaultController = new VariantController();
      expect(defaultController).toBeDefined();
      expect(defaultController).toBeInstanceOf(VariantController);
    });
  });

  describe('findAll', () => {
    it('should return all variants', async () => {
      const mockVariants = createMockVariant();
      vi.mocked(service.findAll).mockReturnValue([mockVariants]);

      const result = await controller.findAll();
      expect(result).toEqual([mockVariants]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a variant by id', async () => {
      const mockVariant = createMockVariant();
      vi.mocked(service.findOne).mockReturnValue(mockVariant);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockVariant);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a variant', async () => {
      const createDto = {
        name: 'Variant',
        sku: 'SKU',
        description: 'Desc',
        price: 100,
      };
      const expectedResult = createMockVariant({ ...createDto });
      vi.mocked(service.create).mockReturnValue(expectedResult);

      const result = await controller.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update a variant', async () => {
      const updateDto = { name: 'Updated Variant' };
      const expectedResult = createMockVariant({ ...updateDto });
      vi.mocked(service.update).mockReturnValue(expectedResult);

      const result = await controller.update(1, updateDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a variant', async () => {
      vi.mocked(service.remove).mockReturnValue();

      const result = await controller.remove(1);
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
