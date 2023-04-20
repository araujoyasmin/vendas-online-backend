import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '5454545454',
    createdAt: new Date(),
    email: 'emailmock@gmail.com',
    id: 1010,
    name: 'nameMock',
    password: '$2b$10$gBawgYO89o/7YUpFSUxUnO5AFdsNhCl89u2kf3qCKkj3Etosn92M.',
    phone: '454545',
    typeUser: UserType.User,
    updatedAt: new Date()
}