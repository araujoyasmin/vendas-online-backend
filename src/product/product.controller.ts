import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-produc.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { create } from 'domain';
import { CreateProduct } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    async getAllProducts(): Promise<ReturnProduct[]>{
        return (await this.productService.getAllProducts()).map(
            (product) => new ReturnProduct(product),
       )
    }
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProduct): Promise<ProductEntity>{
        return this.productService.createProduct(createProduct);
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Delete('/:productId')
    async deleteProduct(
        @Param('productId') productId: number
        ): Promise<DeleteResult>{
        return this.productService.deleteProduct(productId);
    }
}
