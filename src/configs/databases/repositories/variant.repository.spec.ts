import { describe, it, expect, beforeEach } from 'vitest';
import { VariantRepository } from './variant.repository';

describe('VariantRepository', () => {
  let repository: VariantRepository;

  beforeEach(() => {
    repository = new VariantRepository();
  });

  describe('findOneById', () => {
    it('should return a variant by id', () => {
      const variant = repository.createVariant({
        name: 'Test',
        description: 'Test',
        price: 1000,
        sku: 'TEST',
      });
      const result = repository.findOneById(variant.id);
      expect(result).toEqual(variant);
    });

    it('should return undefined if variant not found', () => {
      const result = repository.findOneById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('createVariant', () => {
    it('should create a variant', () => {
      const data = {
        name: 'Test',
        description: 'Test',
        price: 1000,
        sku: 'TEST',
      };
      const result = repository.createVariant(data);
      expect(result).toEqual(data);
    });
  });
});
