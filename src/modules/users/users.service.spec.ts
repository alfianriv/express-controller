import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from './users.service';
import { createMockUser } from '../../helpers/test/mocks/mocks';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestError } from 'routing-controllers';
import { UserRepository } from '../../configs/databases/repositories/user.repository';
import { createMock } from '@golevelup/ts-vitest';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    userRepository = createMock<UserRepository>();
    service = new UserService();
    (service as any).userRepository = userRepository;
  });

  describe('create', () => {
    it('should create a user if username is unique', async () => {
      const dto: CreateUserDto = { name: 'Test', username: 'test' };
      const mockUser = createMockUser({ ...dto });

      vi.mocked(userRepository.findOneByUsername).mockResolvedValue(null);
      vi.mocked(userRepository.createUser).mockResolvedValue(mockUser);

      const result = await service.create(dto);

      expect(userRepository.findOneByUsername).toHaveBeenCalledWith(
        dto.username,
      );
      expect(userRepository.createUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestError if user already exists', async () => {
      const dto: CreateUserDto = { name: 'Test', username: 'test' };
      const existingUser = createMockUser({ username: 'test' });

      vi.mocked(userRepository.findOneByUsername).mockResolvedValue(
        existingUser,
      );

      await expect(service.create(dto)).rejects.toThrow(BadRequestError);
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [createMockUser()];
      vi.mocked(userRepository.findAll).mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser = createMockUser();
      vi.mocked(userRepository.findOneById).mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(userRepository.findOneById).toHaveBeenCalledWith(1, {
        validate: true,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockUser = createMockUser();
      const updateData = { name: 'Updated' };
      const updatedUser = { ...mockUser, ...updateData };

      vi.mocked(userRepository.findOneById).mockResolvedValue(mockUser);
      vi.mocked(userRepository.update).mockResolvedValue(updatedUser);

      const result = await service.update(1, updateData);

      expect(userRepository.findOneById).toHaveBeenCalledWith(1, {
        validate: true,
      });
      expect(userRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedUser);
    });

    it('shound not update throw error username already exist', async () => {
      const mockUser = createMockUser();
      const updateData = { name: 'Updated', username: 'test' };
      const updatedUser = { ...mockUser, ...updateData };

      vi.mocked(userRepository.findOneById).mockResolvedValue(mockUser);
      vi.mocked(userRepository.findOneByUsername).mockResolvedValue(
        createMockUser({ id: 2, username: 'test' }),
      );
      vi.mocked(userRepository.update).mockResolvedValue(updatedUser);

      await expect(service.update(1, updateData)).rejects.toThrow(
        BadRequestError,
      );
    });

    it('should update a user with new unique username', async () => {
      const mockUser = createMockUser();
      const updateData = { username: 'newunique' };
      const updatedUser = { ...mockUser, ...updateData };

      vi.mocked(userRepository.findOneById).mockResolvedValue(mockUser);
      vi.mocked(userRepository.findOneByUsername).mockResolvedValue(null);
      vi.mocked(userRepository.update).mockResolvedValue(updatedUser);

      const result = await service.update(1, updateData);

      expect(userRepository.findOneByUsername).toHaveBeenCalledWith(
        'newunique',
        { exceptionId: 1 },
      );
      expect(userRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const mockUser = createMockUser();
      vi.mocked(userRepository.findOneById).mockResolvedValue(mockUser);

      await service.remove(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
