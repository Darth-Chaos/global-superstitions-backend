import { IsNotEmpty } from 'class-validator';

export class CountryDTO {
  @IsNotEmpty()
  readonly name: string;
}
