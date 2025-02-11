import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  IUserRegisterDtoIn,
  UserLoginReqDto,
  UserLoginResDto,
} from './user.dto';

import { DataSource } from 'typeorm';
import { AuthUserService } from './user.service';

@Controller('auth')
export class AuthUserController {
  constructor(
    private readonly authService: AuthUserService,
    private dataSource: DataSource,
  ) {}

  @Post('/login')
  async login(@Body() body: UserLoginReqDto): Promise<UserLoginResDto> {
    let response: UserLoginResDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const validUser = await this.authService.validUser(body, queryRunner);
      const user = await this.authService.findUserData(validUser, queryRunner);
      response = await this.authService.createUserToken(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
    return response;
  }

  @Post('/register')
  async register(@Body() body: IUserRegisterDtoIn): Promise<void> {
    return await this.authService.registerUser(body);
  }
}
