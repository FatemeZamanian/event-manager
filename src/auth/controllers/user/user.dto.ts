import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResDto {
  @ApiProperty()
  token: string;
}

export class UserLoginReqDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class IUserRegisterDtoIn {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
