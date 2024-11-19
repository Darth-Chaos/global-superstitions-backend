import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { RegionDTO } from './region.dto';
import { CultDTO } from './cult.dto';
import { Expose } from 'class-transformer';
import { EventDTO } from './event.dto';
import { SourceDTO } from './source.dto';

export class CreateSuperstitionDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  @Expose({ name: 'positive_effect' })
  readonly positiveEffect: boolean = false;

  @IsOptional()
  @Expose({ name: 'origin_date' })
  @IsDateString()
  readonly originDate?: Date;

  @IsOptional()
  readonly region?: RegionDTO;

  @IsOptional()
  readonly cults?: Array<CultDTO>;

  @IsOptional()
  readonly events?: Array<EventDTO>;

  @IsOptional()
  sources?: Array<SourceDTO>;
}
