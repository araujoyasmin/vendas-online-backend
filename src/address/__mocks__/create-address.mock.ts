import { cityMock } from "../../city/__mocks__/city.mock";
import { createAddressDto } from "../dtos/createAddress.dto";
import { addressMock } from "./address.mock";

export const createAddressMock: createAddressDto = {
    cep: addressMock.cep,
    cityId: cityMock.id,
    complement: addressMock.complement,
    numberAddress: addressMock.numberAddress
}