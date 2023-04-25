import { CreateProduct } from "../dtos/create-product.dto";
import { categoryMock } from "../../category/__mocks__/category.mock";
import { UpdateProductDTO } from "../dtos/update-product.dto";

export const updateProductMock: UpdateProductDTO = {
    categoryId: categoryMock.id,
    image: "rewrwerwer",
    name: "nome mock 2 product",
    price: 43.00,
}