import { IsNotEmpty } from 'class-validator';
import { CountryDTO } from './country.dto';

export class RegionDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly country: CountryDTO;
}
