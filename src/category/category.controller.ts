import { Controller, Get,Post,UsePipes,ValidationPipe,Body } from '@nestjs/common';
import { ReturnCategory } from './dtos/return-category.dtos';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategory } from './dtos/create-category.dtos';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}
    @Roles(UserType.Admin, UserType.User)  
    @Get()
    async getAllCategories(): Promise<ReturnCategory[]>{
        return (await this.categoryService.getAllCategories()).map(
            (category) => new ReturnCategory(category)
        );
    }
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
        @Body() createCategory: CreateCategory
    ): Promise<CategoryEntity>{
        return this.categoryService.createCategory(createCategory);
    }

}
