import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CountryDto } from './country.dto';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  region_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CountryDto)
  countries: CountryDto[];
}
