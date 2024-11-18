import { Injectable } from '@nestjs/common';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';

@Injectable()
export class SuperstitionsService {
  create(createSuperstitionDto: CreateSuperstitionDto) {
    return 'This action adds a new superstition';
  }

  findAll() {
    return `This action returns all superstitions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} superstition`;
  }

  update(id: number, updateSuperstitionDto: UpdateSuperstitionDto) {
    return `This action updates a #${id} superstition`;
  }

  remove(id: number) {
    return `This action removes a #${id} superstition`;
  }
}
