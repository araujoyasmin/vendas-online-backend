import { CACHE_MANAGER, Inject, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
){}

async getAllCitiesById(stateId): Promise<CityEntity[]>{

    return this.cacheService.getCache<CityEntity[]>(
        `state_${stateId}`,
        () => this.cityRepository.find({
            where: {
                stateId,
            },
        }),
    );

    // const citiesCache: CityEntity[] = await this.cacheManager.get(
    //     `state_${stateId}`,
    // );

    // if(citiesCache){
    //     return citiesCache;
    // }

    // const cities = await this.cityRepository.find({
    //     where:{
    //         stateId
    //     }
    // });

    // await this.cacheManager.set(`state_${stateId}`, cities);

    // return cities;
     
   
}

async getCityById(cityId: number): Promise<CityEntity>{
    const city = await this.cityRepository.findOne({
        where: {
            id: cityId
        }
    });

    if(!city){
        throw new NotFoundException(`cityId not found`);
    }
    return city;
}
    


}
