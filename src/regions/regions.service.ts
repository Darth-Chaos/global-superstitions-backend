import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region } from './entities/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}

  async findAll() {
    return this.regionModel.find().exec();
  }

  async create(createRegionDto: CreateRegionDto) {
    const region = new this.regionModel(createRegionDto);
    return region.save();
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    return this.regionModel.findByIdAndUpdate(id, updateRegionDto, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.regionModel.findByIdAndDelete(id);
  }
}
