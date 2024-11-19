import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Superstition } from './superstition.entity'; // Asegúrate de importar la entidad Superstition

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  event_date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Superstition', required: true })
  superstition: Superstition;
}

export const EventSchema = SchemaFactory.createForClass(Event);
