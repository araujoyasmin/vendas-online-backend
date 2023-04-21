import { Controller, Get } from '@nestjs/common';
import { ReturnCategory } from './dtos/return-category.dtos';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

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
}
