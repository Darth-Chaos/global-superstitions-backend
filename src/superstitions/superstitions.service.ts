import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, SortOrder } from 'mongoose';
import { Superstition } from './entities/superstition.entity';
import { CreateSuperstitionDto } from './dto/create-superstition.dto';
import { UpdateSuperstitionDto } from './dto/update-superstition.dto';

@Injectable()
export class SuperstitionsService {
  constructor(
    @InjectModel(Superstition.name)
    private superstitionModel: Model<Superstition>,
  ) {}

  // Crear una superstición
  async create(createSuperstitionDto: CreateSuperstitionDto) {
    const superstition = new this.superstitionModel(createSuperstitionDto);

    return superstition.save();
  }

  // Obtener supersticiones con filtros, búsqueda, y paginación
  async findAll(
    search: string,
    regionId: string,
    countryName: string,
    sortBy: string,
    page: number,
    limit: number,
  ) {
    const query: RootFilterQuery<Superstition> = {};

    // Búsqueda por nombre o descripción
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
        { belief_groups: { $regex: search, $options: 'i' } },
      ];
    }

    // Filtrar por región
    if (regionId) {
      query.region_id = regionId;
    }

    // Filtrar por país (relación indirecta con regiones)
    if (countryName) {
      query['region.countries.name'] = { $regex: countryName, $options: 'i' };
    }

    // Ordenar
    const sort: { [key: string]: SortOrder } =
      sortBy === 'date' ? { created_at: -1 } : { name: 1 };

    // Paginación
    const skip = (page - 1) * limit;

    // Realizar la consulta
    const [data, total] = await Promise.all([
      this.superstitionModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('region_id') // Para incluir datos de la región
        .exec(),
      this.superstitionModel.countDocuments(query).exec(),
    ]);

    console.log(data);
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // Actualizar una superstición
  async update(id: string, updateSuperstitionDto: UpdateSuperstitionDto) {
    const updatedSuperstition = await this.superstitionModel.findByIdAndUpdate(
      id,
      updateSuperstitionDto,
      { new: true },
    );

    if (!updatedSuperstition) {
      throw new BadRequestException('La superstición no fue encontrada');
    }

    return updatedSuperstition;
  }

  // Eliminar una superstición
  async delete(id: string) {
    const deleted = await this.superstitionModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new BadRequestException('La superstición no fue encontrada');
    }

    return deleted;
  }
}
