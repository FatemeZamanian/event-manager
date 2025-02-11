/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import to from "await-to-js";
import { DataSource, Repository } from "typeorm";
import {
  IUserRegisterDtoIn,
  UserLoginReqDto,
  UserLoginResDto,
} from "./user.dto";

import * as bcrypt from "bcrypt";
import { UsersEntity } from "../../../@orm/models/auth/users.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthUserService {
  constructor(
    private dataSource: DataSource,
    private readonly jwt: JwtService,

    @InjectRepository(UsersEntity)
    private repoUsers: Repository<UsersEntity>
  ) {}

  async validUser(body: UserLoginReqDto): Promise<UsersEntity> {
    const email = body.email.toLowerCase();

    try {
      const user = await this.repoUsers
        .createQueryBuilder("u")
        .where("LOWER(u.email) = :email", { email })
        .select(["u"])
        .getOne();

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) {
        throw new HttpException("Wrong password", HttpStatus.FORBIDDEN);
      }

      return user;
    } catch (err) {
      throw new HttpException(
        "Database error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findUserData(user: UsersEntity): Promise<UsersEntity> {
    try {
      const result = await this.repoUsers
        .createQueryBuilder("u")
        .where("u.id = :id", { id: user.id })
        .select(["u"])
        .getOne();

      if (!result) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (err) {
      throw new HttpException(
        "Database error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createUserToken(user: UsersEntity): Promise<UserLoginResDto> {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.roleId,
    };

    return { token: this.jwt.sign(payload) };
  }

  public async registerUser(user: IUserRegisterDtoIn): Promise<string> {
    if (user.password.length < 6) {
      throw new HttpException(
        "Password must be longer than 6 characters",
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
      await this.repoUsers.save({
        username: user.username,
        email: user.email,
        password: user.password,
        roleId: 2,
      });
    } catch (err) {
      if (err?.code === "23505") {
        throw new HttpException(
          "Username or email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Database error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return "User created successfully";
  }
}
