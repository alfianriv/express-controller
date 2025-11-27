import { BaseRepository } from '@/commons/database/base.repository';
import { UserModel } from '@/configs/databases/models/users.model';
import { BadRequestError, NotFoundError } from 'routing-controllers';

export class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super();
  }

  findOneById(id: number, opts?: { validate?: boolean }) {
    const user = this.findOne({ id });
    if (!user && opts?.validate) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  findOneByUsername(
    username: string,
    opts?: { validate?: boolean; exceptionId?: number },
  ) {
    const user = this.findOne({ username });
    if (user && user.id !== opts?.exceptionId) {
      throw new BadRequestError('Username already taken');
    }
    if (!user && opts?.validate) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  createUser(data: Partial<UserModel>) {
    if (data.id) {
      const user = this.findOneById(data.id);
      if (user) {
        throw new Error('User already exists');
      }
    }
    return this.create(data);
  }
}
