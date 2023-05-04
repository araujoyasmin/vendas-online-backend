import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../cache/cache.service';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mock';
import {  loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
       
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  
  it('should return user if password and email valid 1', async () => {
    const user = await service.login(loginUserMock);
   
    expect(user).toEqual(
      {
        accessToken: jwtMock,
        user: new ReturnUserDto(userEntityMock)
      }
    );

  });

  it('should return user password invalid and email valid 2', async () => {
    
    expect(
      service.login({ ...loginUserMock, password: 'novasenha'}),
    
    ).rejects.toThrowError();

  });

  it('should return user if email not exist', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);
    expect(
      service.login(loginUserMock),
    
    ).rejects.toThrowError();

  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValueOnce(new Error());
    expect(
      service.login(loginUserMock),
    
    ).rejects.toThrowError();

  });

});
