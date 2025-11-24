import { describe, it, expect, beforeEach } from 'vitest';
import { BaseRepository } from './base.repository';

interface MockEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

describe('BaseRepository', () => {
    let repository: BaseRepository<MockEntity>;

    beforeEach(() => {
        repository = new BaseRepository<MockEntity>();
    });

    describe('create', () => {
        it('should create an entity with id and timestamps', () => {
            const data = { name: 'Test' };
            const result = repository.create(data);

            expect(result.id).toBe(1);
            expect(result.name).toBe('Test');
            expect(result.createdAt).toBeInstanceOf(Date);
            expect(result.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe('findAll', () => {
        it('should return all non-deleted entities', () => {
            repository.create({ name: 'Test 1' });
            repository.create({ name: 'Test 2' });

            const result = repository.findAll();
            expect(result).toHaveLength(2);
        });

        it('should not return deleted entities', () => {
            const entity = repository.create({ name: 'Test 1' });
            repository.delete(entity.id);

            const result = repository.findAll();
            expect(result).toHaveLength(0);
        });
    });

    describe('findOne', () => {
        it('should return an entity matching the criteria', () => {
            const entity = repository.create({ name: 'Test' });
            const result = repository.findOne({ id: entity.id });

            expect(result).toEqual(entity);
        });

        it('should return undefined if no entity matches', () => {
            repository.create({ name: 'Test' });
            const result = repository.findOne({ id: 999 });
            expect(result).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update an entity', async () => {
            const entity = repository.create({ name: 'Test' });
            repository.create({ name: 'Test 2' });
            const originalUpdatedAt = entity.updatedAt;
            const updateData = { name: 'Updated' };

            await new Promise(resolve => setTimeout(resolve, 10));

            const result = repository.update(entity.id, updateData);

            expect(result.name).toBe('Updated');
            expect(result.updatedAt).not.toBe(originalUpdatedAt);
        });
    });

    describe('delete', () => {
        it('should soft delete an entity', () => {
            const entity = repository.create({ name: 'Test' });
            repository.delete(entity.id);

            const found = repository.findOne({ id: entity.id });
            expect(found.deletedAt).toBeInstanceOf(Date);

            const all = repository.findAll();
            expect(all).toHaveLength(0);
        });
    });
});
