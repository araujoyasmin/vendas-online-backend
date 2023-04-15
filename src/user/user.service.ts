import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    // private users: User[] = [];
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto) : Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        
        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
        })

        // const user: UserEntity = {
        //     ...createUserDto,
        //     id: this.users.length + 1,
        //     password: passwordHashed,
        // };

        // this.users.push(user);
        // console.log('passoword: ', passwordHashed);

        // return (user);
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

}
