import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import {UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){

    }


@UsePipes(ValidationPipe)
@Post()
async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity>{
    //   return{
    //     ...createUser,
    //     password: undefined
    //   };
    return this.userService.createUser(createUser);
    }

@Get()
async getAllUser(): Promise<ReturnUserDto[]>{
    return (await this.userService.getAllUser()).map(
        (userEntity) => new ReturnUserDto(userEntity)
    );
}

@Get('/:userId')
async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
    return new ReturnUserDto (await this.userService.getUserByIdUsingRelations(userId));
}

@Patch()
@UsePipes(ValidationPipe)
async updatePasswordUser(
    @UserId() userId: number,
    @Body() updatePasswordDTO: UpdatePasswordDTO
 ): Promise<UserEntity>{
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
}

}

