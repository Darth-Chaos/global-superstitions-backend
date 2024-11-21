import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { Region, RegionSchema } from '../../regions/entities/region.entity';
import { Cult } from './cult.entity';
import { Source } from './source.entity';
import { Event, EventSchema } from './event.entity';

export type SuperstitionDocument = HydratedDocument<Superstition>;

@Schema()
export class Superstition {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, default: false })
  positive_effect: boolean;

  @Prop()
  origin_date?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Region', required: true })
  region_id: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  belief_groups: string[];

  @Prop({ type: Types.ObjectId, ref: 'Source' })
  sources?: Array<Source>;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const SuperstitionSchema = SchemaFactory.createForClass(Superstition);
