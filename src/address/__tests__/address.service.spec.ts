import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../cache/cache.service';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { addressMock } from '../__mocks__/address.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/create-address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let AddressRepository: Repository<AddressEntity>;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(cityMock)
          }
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
          }
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    AddressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });


  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock.id
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService,'getUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id)
    ).rejects.toThrowError();
  });
 

});
