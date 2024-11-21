import { IsString } from 'class-validator';

export class SourceDto {
  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  author: string;
}
