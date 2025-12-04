import { describe, it, expect, beforeEach } from 'vitest';
import { ItemRepository } from './item.repository';

describe('ItemRepository', () => {
  let repository: ItemRepository;

  beforeEach(() => {
    repository = new ItemRepository();
  });

  describe('findOneById', () => {
    it('should return a item by id', () => {
      const item = repository.createItem({
        name: 'Test',
        description: 'Test',
      });
      const result = repository.findOneById(item.id);
      expect(result).toEqual(item);
    });

    it('should return undefined if item not found', () => {
      const result = repository.findOneById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('createItem', () => {
    it('should create a item', () => {
      const data = {
        name: 'Test',
        description: 'Test',
      };
      const result = repository.createItem(data);
      expect(result).toEqual(data);
    });
  });
});
