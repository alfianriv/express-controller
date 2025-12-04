import { BaseRepository } from '../../../commons/database/base.repository';
import { UserModel } from '../models/users.model';

export class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super();
  }

  findOneById(id: number) {
    const user = this.findOne({ id });
    return user;
  }

  findOneByUsername(username: string) {
    const user = this.findOne({ username });
    return user;
  }

  createUser(data: Partial<UserModel>) {
    return this.create(data);
  }
}
