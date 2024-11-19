import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class EventDTO {
  @IsNotEmpty()
  readonly name: string;

  readonly description?: string;

  @IsNotEmpty()
  @Expose({ name: 'event_date' })
  readonly eventDate: Date;
}
