import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
    // private users: User[] = [];
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    

    async createUser(createUserDto: CreateUserDto) : Promise<UserEntity> {
        const user = await  this.getUserByEmail(createUserDto.email).catch(()=>undefined);
        if(user){
            throw new BadGatewayException('Email já existente!');
        }


        const saltOrRounds = 10;
        const passwordHashed = await createPasswordHashed(createUserDto.password);
        
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        })

    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    }
                }
            },
        });
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    async getUserById(userId: number): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if(!user){
            throw new NotFoundException(`UserId Not Found`);
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if(!user){
            throw new NotFoundException(`UserId Not Found`);
        }

        return user;
    }

    async updatePasswordUser(updatePasswordDTO: UpdatePasswordDTO, userId: number): Promise<UserEntity>{
        const user = await this.getUserById(userId);
        
        const passwordHashed = await createPasswordHashed(
            updatePasswordDTO.newPassword,
            );

        const isMatch = await validatePassword(updatePasswordDTO.lastPassword, user.password || '');
        
        if(!isMatch){
            throw new BadRequestException('Last password invalid!');
        }
        
        return this.userRepository.save({
            ...user,
            password: passwordHashed,
        });
    }
}
