import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { Region, RegionSchema } from './region.entity';
import { Cult } from './cult.entity';
import { Source } from './source.entity';
import { Event, EventSchema } from './event.entity';

export type SuperstitionDocument = HydratedDocument<
  Superstition,
  SuperstitionDocumentOverride
>;

export type SuperstitionDocumentOverride = {
  region?: Types.Subdocument<Types.ObjectId & Region>;
  events?: Types.Subdocument<Types.ObjectId & Event>;
};

@Schema()
export class Superstition {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, default: false })
  positive_effect: boolean;

  @Prop()
  origin_date?: Date;

  @Prop(RegionSchema)
  region?: Region;

  @Prop({ type: Types.ObjectId, ref: 'Cult' })
  cults?: Array<Cult>;

  @Prop(EventSchema)
  events?: Array<Event>;

  @Prop({ type: Types.ObjectId, ref: 'Source' })
  sources?: Array<Source>;
}

export const SuperstitionSchema = SchemaFactory.createForClass(Superstition);
