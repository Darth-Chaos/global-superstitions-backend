import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  population: number;
}
