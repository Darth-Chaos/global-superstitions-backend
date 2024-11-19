import { IsNotEmpty } from 'class-validator';

export class CultDTO {
  @IsNotEmpty()
  readonly name: string;
}
