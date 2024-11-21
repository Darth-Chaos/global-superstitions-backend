import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SourceDto } from './source.dto';

export class CreateSuperstitionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  region_id: string;

  @IsArray()
  @IsOptional()
  belief_groups?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SourceDto)
  @IsOptional()
  sources?: SourceDto[];
}
