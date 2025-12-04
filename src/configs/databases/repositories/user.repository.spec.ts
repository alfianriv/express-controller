import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  describe('findOneById', () => {
    it('should return a user by id', () => {
      const user = repository.createUser({ name: 'Test', username: 'test' });
      const result = repository.findOneById(user.id);
      expect(result).toEqual(user);
    });

    it('should return undefined if user not found', () => {
      const result = repository.findOneById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user by username', () => {
      const user = repository.createUser({ name: 'Test', username: 'test' });
      const result = repository.findOneByUsername('test');
      expect(result).toEqual(user);
    });

    it('should return undefined if user not found', () => {
      const result = repository.findOneByUsername('unknown');
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const data = { name: 'Test', username: 'test' };
      const result = repository.createUser(data);
      expect(result.id).toBeDefined();
      expect(result.username).toBe('test');
    });

    it('should create a user with specific id if it does not exist', () => {
      const data = { id: 99, name: 'Test', username: 'test' };
      const result = repository.createUser(data);
      expect(result.id).toBe(99);
    });
  });
});
