import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { CreateCategory } from './dtos/create-category.dtos';
import { create } from 'domain';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ){}

    async getAllCategories(): Promise<CategoryEntity[]>{
        const categories = await this.categoryRepository.find();

        if(!categories ||categories.length ===0){
            throw new NotFoundException('Categories empty')
        }
        return categories;
    }

   

    async getCategoryByName(name:string): Promise<CategoryEntity>{
        const category = await this.categoryRepository.findOne({
            where: {
                name
            }
        });
        if(!category){
            throw new NotFoundException(`Category name ${name} not found`);
        }
        return category;
    }

    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity>{
        const category = await this.getCategoryByName(createCategory.name).catch(
            () => undefined);
            
        if(category){
            throw new BadRequestException(`Category name ${createCategory.name} exist`);
        }
        return this.categoryRepository.save(createCategory);
    }

    async getCategoryById(categoryId: number): Promise<CategoryEntity>{
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId,
            }
        });
        if(!category){
            throw new NotFoundException('Category id not found');
        }

        return category;
    }
}
