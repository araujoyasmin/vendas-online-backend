import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../cache.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

describe('CityService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => userEntityMock,
            set: () => jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data in cache', async () => {

    const user = await service.getCache('key', () => null);

    expect(user).toEqual(userEntityMock);
  });

  it('should return data in function', async () => {
    const result = { teste: 'test'};
    jest.spyOn(cacheManager,'get').mockResolvedValue(undefined);
    const user = await service.getCache('key', () => Promise.resolve(result));
    
    expect(user).toEqual(result);
  });

  


});
