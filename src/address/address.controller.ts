import { Controller,Param, Body, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { createAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { get } from 'http';
import { returnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User,UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}
    
@Post()
@UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: createAddressDto,
        @UserId() userId: number,)
        // @Param('userId') userId: number)
        : Promise<AddressEntity>{
        return this.addressService.createAddress(createAddressDto,userId);

    }

@Get()
    async getAddressByUserId(
        @UserId() userId: number,)
        : Promise<returnAddressDto[]>{
       return (await this.addressService.getAddressByUserId(userId)).map(
        (address) => new returnAddressDto(address),
       );

    }

}
