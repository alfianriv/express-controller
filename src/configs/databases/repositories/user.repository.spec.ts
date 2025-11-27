import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepository } from './user.repository';
import { BadRequestError, NotFoundError } from 'routing-controllers';

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

    it('should return undefined if user not found (no validate)', () => {
      const result = repository.findOneById(999);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundError if user not found (validate: true)', () => {
      expect(() => repository.findOneById(999, { validate: true })).toThrow(
        NotFoundError,
      );
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user by username', () => {
      const user = repository.createUser({ name: 'Test', username: 'test' });
      const result = repository.findOneByUsername('test', {
        exceptionId: user.id,
      });
      expect(result).toEqual(user);
    });

    it('should return undefined if user not found (no validate)', () => {
      const result = repository.findOneByUsername('unknown');
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundError if user not found (validate: true)', () => {
      expect(() =>
        repository.findOneByUsername('unknown', { validate: true }),
      ).toThrow(NotFoundError);
    });

    it('should throw BadRequestError if username is taken by another user', () => {
      repository.createUser({ name: 'User 1', username: 'test' });
      expect(() =>
        repository.findOneByUsername('test', { exceptionId: 999 }),
      ).toThrow(BadRequestError);
    });

    it('should not throw if username is taken by the same user (exceptionId matches)', () => {
      const user = repository.createUser({ name: 'User 1', username: 'test' });
      const result = repository.findOneByUsername('test', {
        exceptionId: user.id,
      });
      expect(result).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const data = { name: 'Test', username: 'test' };
      const result = repository.createUser(data);
      expect(result.id).toBeDefined();
      expect(result.username).toBe('test');
    });

    it('should throw Error if user with same id already exists', () => {
      const user = repository.createUser({ name: 'Test', username: 'test' });
      expect(() =>
        repository.createUser({ id: user.id, name: 'Test 2' }),
      ).toThrow('User already exists');
    });

    it('should create a user with specific id if it does not exist', () => {
      const data = { id: 99, name: 'Test', username: 'test' };
      const result = repository.createUser(data);
      expect(result.id).toBe(99);
    });
  });
});
