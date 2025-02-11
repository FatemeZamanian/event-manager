import { ApiProperty } from '@nestjs/swagger';

export class eventDtoIn {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  registrationStartDate: Date;

  @ApiProperty()
  registrationEndDate: Date;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
