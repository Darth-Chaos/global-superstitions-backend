import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('/api/v2/regions')
export class RegionsController {
  constructor(private readonly regionService: RegionsService) {}

  @Get()
  async findAll() {
    return this.regionService.findAll();
  }

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.regionService.delete(id);
  }
}
