import { UserModel } from '../../../models/users.model';

export const createMockUser = (overrides?: Partial<UserModel>): UserModel => {
  return {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
};
