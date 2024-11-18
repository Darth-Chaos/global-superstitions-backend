import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperstitionDto } from './create-superstition.dto';

export class UpdateSuperstitionDto extends PartialType(CreateSuperstitionDto) {}
