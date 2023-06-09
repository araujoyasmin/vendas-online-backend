import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProduct } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
    ){}

    async getAllProducts(): Promise<ProductEntity[]>{
        const products = await this.productRepository.find();

        if(!products || products.length ===0){
            throw new NotFoundException('Not found products');
        }

        return products;
    }

    async createProduct(createProduct: CreateProduct): Promise<ProductEntity>{
        await this.categoryService.getCategoryById(createProduct.categoryId);

        return this.productRepository.save({
            ... createProduct,
        });
    }

    async getProductById(productId: number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({
            where: {
                id: productId,
            }
        });
        if(!product){
            throw new NotFoundException('product not found!');
        }

        return product;
    }

    async deleteProduct(productId: number): Promise<DeleteResult>{
        await this.getProductById(productId);
        return this.productRepository.delete({ id: productId});
    }

    async updateProduct(updateProduct: UpdateProductDTO, productId: number): Promise<ProductEntity>{
        const product = await this.getProductById(productId);
        return this.productRepository.save({
            ...product,
            ...updateProduct,
        });
    }
}
