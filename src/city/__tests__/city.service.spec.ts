import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock])
          }
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          }
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return city by id', async () => {
    const city = await service.getCityById(cityMock.id);
    expect(city).toEqual(cityMock);
  });

  it('should return error not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValueOnce(undefined);
    expect(service.getCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should return cities in getAllCitiesById', async () => {
    const city = await service.getAllCitiesById(cityMock.id);
    expect(city).toEqual([cityMock]);
  });


});
