import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Superstition } from './superstition.entity'; // Asegúrate de importar la entidad Superstition

export type CultDocument = HydratedDocument<Cult>;

@Schema()
export class Cult {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Superstition', required: true })
  superstition: Superstition;
}

export const CultSchema = SchemaFactory.createForClass(Cult);