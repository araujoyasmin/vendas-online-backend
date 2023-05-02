import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const updatePasswordMock: UpdatePasswordDTO = {
    lastPassword: 'novasenha',
    newPassword:'1234556'
}   

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: '2121212',
    newPassword:'21212'
}