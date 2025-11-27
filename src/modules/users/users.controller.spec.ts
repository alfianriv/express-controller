import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { createMockUser } from '../../helpers/test/mocks/mocks';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createMock } from '@golevelup/ts-vitest';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    userService = createMock<UserService>();
    controller = new UserController();
    (controller as any).userService = userService;
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers = [createMockUser()];
      vi.mocked(userService.findAll).mockReturnValue(mockUsers);
      const result = controller.getAll();
      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser = createMockUser();
      vi.mocked(userService.findOne).mockReturnValue(mockUser);
      const result = controller.findOne(1);
      expect(userService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { name: 'Test', username: 'test' };
      const mockUser = createMockUser({ ...dto });
      vi.mocked(userService.create).mockResolvedValue(mockUser);
      const result = await controller.create(dto);
      expect(userService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { name: 'Updated' };
      const mockUser = createMockUser({ ...dto });
      vi.mocked(userService.update).mockResolvedValue(mockUser);
      const result = await controller.update(1, dto);
      expect(userService.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      vi.mocked(userService.remove).mockResolvedValue(undefined);
      await controller.remove(1);
      expect(userService.remove).toHaveBeenCalledWith(1);
    });
  });
});
