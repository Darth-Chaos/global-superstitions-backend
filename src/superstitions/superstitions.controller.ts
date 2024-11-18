import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuperstitionsService } from './superstitions.service';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';

@Controller('superstitions')
export class SuperstitionsController {
  constructor(private readonly superstitionsService: SuperstitionsService) {}

  @Post()
  create(@Body() createSuperstitionDto: CreateSuperstitionDto) {
    return this.superstitionsService.create(createSuperstitionDto);
  }

  @Get()
  findAll() {
    return this.superstitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superstitionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuperstitionDto: UpdateSuperstitionDto) {
    return this.superstitionsService.update(+id, updateSuperstitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superstitionsService.remove(+id);
  }
}
