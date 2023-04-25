import { CreateProduct } from "../../product/dtos/create-product.dto";
import { categoryMock } from "./category.mock";

export const createProductMock: CreateProduct = {
    categoryId: categoryMock.id,
    image: "sasasasa",
    name: "nome mock product",
    price: 40.00,
}