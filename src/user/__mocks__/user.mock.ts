import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '5454545454',
    createdAt: new Date(),
    email: 'emailmock@gmail.com',
    id: 1010,
    name: 'nameMock',
    password: '$2b$10$NWlb0MNQjLPPxeMh5xhqduB0UzF1OrYn2ZmzsCzVjPcioh7Ja6oNu',
    phone: '454545',
    typeUser: UserType.User,
    updatedAt: new Date()
}