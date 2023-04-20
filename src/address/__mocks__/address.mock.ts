import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMock: AddressEntity = {
    cep: '4544544',
    cityId: cityMock.id,
    complement: 'sadsddd',
    createdAt: new Date(),
    id: 45444,
    numberAddress: 45,
    updatedAt: new Date(),
    userId: userEntityMock.id
}