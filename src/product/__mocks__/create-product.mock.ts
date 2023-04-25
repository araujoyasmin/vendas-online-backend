import { CreateProduct } from "../dtos/create-product.dto";
import { categoryMock } from "../../category/__mocks__/category.mock";

export const createProductMock: CreateProduct = {
    categoryId: categoryMock.id,
    image: "sasasasa",
    name: "nome mock product",
    price: 40.00,
}