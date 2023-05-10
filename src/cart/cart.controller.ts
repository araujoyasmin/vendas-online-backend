import { Controller,Get,Post,UsePipes,ValidationPipe,Body,Delete,Param,Patch } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDTO } from './dtos/update-cart.dto';


@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService
    ){}

    @UsePipes(ValidationPipe)
    @Post()
    async createCart(
     @Body() insertCart: InsertCartDTO, @UserId() userId: number
    ): Promise<ReturnCartDTO>{
        return new ReturnCartDTO(
            await this.cartService.insertProductInCart(insertCart,userId),);
    }

    @Get()
    async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDTO>{
        return new ReturnCartDTO(await this.cartService.getCartByUserId(userId, true));
    }

    @Delete()
    async clearCart(@UserId() userId: number): Promise<DeleteResult>{
        return this.cartService.clearCart(userId);
    }

    @Delete('/product/:productId')
    async deleteProductCart(
        @Param('productId') productId: number,
        @UserId() userId: number, 
        ): Promise<DeleteResult>{
            return this.cartService.deleteProductCart(productId,userId);
        }

        @Patch()
        async updateProductInCart(
            @Body() updateCartDTO: UpdateCartDTO,
            @UserId() userId: number
        ): Promise<ReturnCartDTO>{
            return new ReturnCartDTO(
                await this.cartService.updateProductInCart(updateCartDTO, userId)
            );
        }
}
