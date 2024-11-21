import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { SuperstitionsService } from './superstitions.service';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';

@Controller('api/v2/superstitions')
export class SuperstitionsController {
  constructor(private readonly superstitionService: SuperstitionsService) {}

  // Crear una nueva superstición
  @Post()
  async create(@Body() createSuperstitionDto: CreateSuperstitionDto) {
    return this.superstitionService.create(createSuperstitionDto);
  }

  // Obtener todas las supersticiones con filtros y paginación
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('regionId') regionId?: string,
    @Query('countryName') countryName?: string,
    @Query('sortBy') sortBy?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.superstitionService.findAll(
      search,
      regionId,
      countryName,
      sortBy,
      +page,
      +limit,
    );
  }

  // Actualizar una superstición
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSuperstitionDto: UpdateSuperstitionDto,
  ) {
    return this.superstitionService.update(id, updateSuperstitionDto);
  }

  // Eliminar una superstición
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.superstitionService.delete(id);
  }
}
