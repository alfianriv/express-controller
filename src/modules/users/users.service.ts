import { UserModel } from '../../configs/databases/models/users.model';
import { CreateUserDto } from '../../controllers/users/dto/create-user.dto';
import { UserRepository } from '../../configs/databases/repositories/user.repository';
import { BadRequestError, NotFoundError } from 'routing-controllers';

export class UserService {
  constructor(private readonly userRepository?: UserRepository) {
    this.userRepository = userRepository ?? new UserRepository();
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    const user = await this.userRepository.findOneByUsername(data.username);
    if (user) {
      throw new BadRequestError('Username already taken');
    }
    return this.userRepository.createUser(data);
  }

  findAll(): UserModel[] {
    return this.userRepository.findAll();
  }

  findOne(id: number, opts?: { validate?: boolean }): UserModel {
    const user = this.userRepository.findOneById(id);
    if (!user && opts?.validate) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async update(id: number, data: Partial<UserModel>): Promise<UserModel> {
    await this.findOne(id);
    if (data.username) {
      const user = await this.userRepository.findOneByUsername(data.username);
      if (user) {
        throw new BadRequestError('Username already taken');
      }
    }
    return this.userRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, { validate: true });
    this.userRepository.delete(id);
  }
}
