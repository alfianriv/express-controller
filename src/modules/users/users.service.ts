import { UserModel } from "../../models/users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { BadRequestError } from "routing-controllers";

export class UserService {
    private readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: CreateUserDto): Promise<UserModel> {
        const user = await this.userRepository.findOneByUsername(data.username);
        if (user) {
            throw new BadRequestError('User already exists');
        }
        return this.userRepository.createUser(data);
    }

    findAll(): UserModel[] {
        return this.userRepository.findAll();
    }

    findOne(id: number): UserModel {
        return this.userRepository.findOneById(id, { validate: true });
    }

    async update(id: number, data: Partial<UserModel>): Promise<UserModel> {
        await this.findOne(id);
        if (data.username) {
            const user = await this.userRepository.findOneByUsername(data.username, { exceptionId: id });
            if (user) {
                throw new BadRequestError('User already exists');
            }
        }
        return this.userRepository.update(id, data);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.findOneById(id, { validate: true });
        this.userRepository.delete(id);
    }
}