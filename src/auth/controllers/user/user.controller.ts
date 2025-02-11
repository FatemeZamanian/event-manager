import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  IUserRegisterDtoIn,
  UserLoginReqDto,
  UserLoginResDto,
} from "./user.dto";

import { DataSource } from "typeorm";
import { AuthUserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("user / Auth")
@Controller("auth")
export class AuthUserController {
  constructor(
    private readonly authService: AuthUserService,
    private dataSource: DataSource
  ) {}

  @Post("/login")
  async login(@Body() body: UserLoginReqDto): Promise<UserLoginResDto> {
    let response: UserLoginResDto;
    try {
      console.log("JWT Secret:", process.env.JWT_SECRET);
      const validUser = await this.authService.validUser(body);
      const user = await this.authService.findUserData(validUser);
      response = await this.authService.createUserToken(user);
    } catch (err) {
      throw new HttpException(
        "internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return response;
  }

  @Post("/register")
  async register(@Body() body: IUserRegisterDtoIn): Promise<string> {
    return await this.authService.registerUser(body);
  }
}
