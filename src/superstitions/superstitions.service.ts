import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Superstition } from './entities/superstition.entity';
import { Model } from 'mongoose';

@Injectable()
export class SuperstitionsService {
  constructor(
    @InjectModel(Superstition.name)
    private readonly superstitionModel: Model<Superstition>,
  ) {}

  create(createSuperstitionDto: CreateSuperstitionDto) {
    const createdSuperstition = new this.superstitionModel(
      createSuperstitionDto,
    );

    return createdSuperstition.save();
  }

  findAll(sortByDate: boolean): Promise<Array<Superstition>> {
    const superstitions = this.superstitionModel.find();

    if (sortByDate == true) superstitions.sort({ origin_date: 1 });

    return superstitions.exec();
  }

  findAllByCountry(country: string): Promise<Array<Superstition>> {
    return this.superstitionModel.find({ region: { country } }).exec();
  }

  findOneById(id: string): Promise<Superstition | null> {
    return this.superstitionModel.findOne({ _id: id }).exec();
  }

  findOneByName(name: string): Promise<Superstition | null> {
    return this.superstitionModel.findOne({ name }).exec();
  }

  update(
    id: string,
    updateSuperstitionDto: UpdateSuperstitionDto,
  ): Promise<Superstition> {
    const updatedSuperstition = this.superstitionModel.findByIdAndUpdate(
      id,
      { $set: updateSuperstitionDto },
      { new: true, runValidators: true },
    );

    return updatedSuperstition;
  }

  remove(id: string): Promise<Superstition> {
    const deletedSuperstition = this.superstitionModel.findByIdAndDelete(id);

    return deletedSuperstition;
  }
}
