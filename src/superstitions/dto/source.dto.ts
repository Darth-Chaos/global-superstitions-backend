import { IsNotEmpty, IsOptional } from 'class-validator';

export class SourceDTO {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly author?: string;

  @IsNotEmpty()
  readonly cite: string;

  @IsOptional()
  readonly url?: string;
}
