import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SuperstitionsService } from './superstitions.service';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';
import { Types } from 'mongoose';
import { retry } from 'rxjs';

@Controller('/api/v1/superstitions')
export class SuperstitionsController {
  constructor(private readonly superstitionsService: SuperstitionsService) {}

  @Post('/create')
  create(@Body() createSuperstitionDto: CreateSuperstitionDto) {
    try {
      return this.superstitionsService.create(createSuperstitionDto);
    } catch (error) {
      throw new HttpException(
        'There are missing fields.',
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Get()
  findAll(@Query('sort_by_date') sortByDate: boolean = false) {
    return this.superstitionsService.findAll(sortByDate);
  }

  @Get('/country/:country')
  findByCountry(@Param('country') country: string) {
    return this.superstitionsService.findAllByCountry(country);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(
        'Id must be a valid MongoDB ObjectId',
        HttpStatus.BAD_REQUEST,
      );

    const superstition = await this.superstitionsService.findOneById(id);

    if (!superstition)
      throw new HttpException('Id not Found.', HttpStatus.NOT_FOUND);

    return superstition;
  }

  @Get('/name/:name')
  async findOneByName(@Param('name') id: string) {
    const superstition = await this.superstitionsService.findOneByName(id);

    if (superstition === null)
      throw new HttpException('Name not Found.', HttpStatus.NOT_FOUND);

    return superstition;
  }

  @Patch('/update/id/:id')
  async update(
    @Param('id') id: string,
    @Body() updateSuperstitionDto: UpdateSuperstitionDto,
  ) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(
        'Id must be a valid MongoDB ObjectId',
        HttpStatus.BAD_REQUEST,
      );

    const superstition = await this.superstitionsService.update(
      id,
      updateSuperstitionDto,
    );

    if (!superstition)
      throw new HttpException('Id not Found.', HttpStatus.NOT_FOUND);

    return superstition;
  }

  @Delete('/delete/id/:id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(
        'Id must be a valid MongoDB ObjectId',
        HttpStatus.BAD_REQUEST,
      );

    const superstition = await this.superstitionsService.remove(id);

    if (!superstition)
      throw new HttpException('Id not Found.', HttpStatus.NOT_FOUND);

    return superstition;
  }
}
