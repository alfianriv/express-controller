import { Body, Controller, Delete, Get, OnUndefined, Param, Post, Put } from "routing-controllers";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserModel } from "../../models/users.model";

@Controller('/v1/users')
export class UserController {
    private readonly userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Get()
    getAll(): UserModel[] {
        return this.userService.findAll();
    }

    @Get('/:id')
    @OnUndefined(404)
    findOne(@Param('id') id: number): UserModel {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateUserDto): Promise<UserModel> {
        return this.userService.create(data);
    }

    @Put('/:id')
    @OnUndefined(404)
    update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserModel> {
        return this.userService.update(id, data);
    }

    @Delete('/:id')
    @OnUndefined(404)
    remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
