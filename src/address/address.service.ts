import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { createAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ){}

    async createAddress(createAddressDto: createAddressDto, userId:number){
        await this.userService.getUserById(userId);
        await this.cityService.getCityById(createAddressDto.cityId);
        return this.addressRepository.save({
            ...createAddressDto,
            userId,
        });
    }

    async getAddressByUserId(userId: number): Promise<AddressEntity[]>{
        const address = await this.addressRepository.find({
            where:{
                userId,

            },
            relations: {
                city: {
                    state: true
                }
            }
        });

        if(!address || address.length ===0){
            throw new NotFoundException('address not found for userId');
        }
        return address;
    }
}
