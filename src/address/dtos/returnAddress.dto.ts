import { AddressEntity } from "../entities/address.entity";

export class returnAddressDto{
    complement: string;
    numberAddress: number;
    cep: string;

    constructor(address: AddressEntity){
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }
}