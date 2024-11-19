import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Superstition } from './superstition.entity'; // Asegúrate de importar la entidad Superstition

export type SourceDocument = HydratedDocument<Source>;

@Schema()
export class Source {
  @Prop({ required: true })
  title: string;

  @Prop()
  author?: string;

  @Prop({ required: true })
  cite: string;

  @Prop()
  url?: string;

  @Prop({ type: Types.ObjectId, ref: 'Superstition', required: true })
  superstition: Superstition;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
