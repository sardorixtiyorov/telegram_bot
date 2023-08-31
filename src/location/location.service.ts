import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './models/location.model';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location) private readonly locationRepo: typeof Location,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepo.create(createLocationDto);
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
