import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {

//    @Get()
//    async getAllUsers(){
//      return JSON.stringify( { test: 'abc'});
//    }

@Post()
async createUser(@Body() createUser: CreateUserDto){
      return{
        ...createUser,
        password: undefined
      };
    }
}

