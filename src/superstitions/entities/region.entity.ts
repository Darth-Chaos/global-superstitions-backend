import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Country, CountrySchema } from './country.entity'; // Asegúrate de importar la entidad Country

export type RegionDocument = HydratedDocument<Region, RegionDocumentOverride>;

export type RegionDocumentOverride = {
  country: Types.Subdocument<Types.ObjectId & Country>;
};

@Schema()
export class Region {
  @Prop({ required: true })
  name: string;

  @Prop(CountrySchema)
  country: Country;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
