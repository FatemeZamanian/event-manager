import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import to from 'await-to-js';
import { DataSource, QueryRunner } from 'typeorm';
import {
  IUserRegisterDtoIn,
  UserLoginReqDto,
  UserLoginResDto,
} from './user.dto';

import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../../@orm/models/auth/users.model';
import { RolesEntity } from '../../../@orm/models/auth/roles.model';

@Injectable()
export class AuthUserService {
  constructor(
    private dataSource: DataSource,
    private readonly jwt: JwtService,
  ) {}

  async validUser(
    body: UserLoginReqDto,
    queryRunner: QueryRunner,
  ): Promise<UsersEntity> {
    const email = body.email.toLowerCase();
    const [err, res] = await to(
      queryRunner.manager
        .createQueryBuilder(UsersEntity, 'u')
        .where('LOWER(u.email) = :email', { email })
        .select(['u'])
        .getOne(),
    );

    if (err) {
      throw new HttpException('error in db ', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!res) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);
    }

    const validPassword = await bcrypt.compare(body.password, res.password);
    if (!validPassword) {
      throw new HttpException('wrong password ', HttpStatus.FORBIDDEN);
    }

    return res;
  }

  public async createUserToken(res: UsersEntity): Promise<UserLoginResDto> {
    const obj = {
      id: res.id,
      username: res.username,
      email: res.email,
      role: res.roleId,
    };

    const retVal = {
      token: await this.jwt.sign(obj),
    } as UserLoginResDto;

    return retVal;
  }

  public async findUserData(res: UsersEntity, queryRunner: QueryRunner) {
    const userId = res.id;
    const [err, result] = await to(
      queryRunner.manager
        .createQueryBuilder(UsersEntity, 'u')
        .where('u.id = :userId', { userId })
        .select(['u'])
        .getOne(),
    );
    if (err) {
      throw new HttpException('error in db ', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!result) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);
    }

    return result;
  }
  public async registerUser(user: IUserRegisterDtoIn): Promise<void> {
    if (user.password.length < 6) {
      throw new HttpException(
        'password must be longer than 6 character',
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.saveUser(user, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err.message.includes('duplicate')) {
        throw new HttpException(
          'username or email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);
    } finally {
      await queryRunner.release();
    }
  }

  private async checkEmail(inp: string, queryRunner: QueryRunner) {
    const email = inp.toLocaleLowerCase();
    const [err, data] = await to(
      queryRunner.manager
        .createQueryBuilder(UsersEntity, 'u')
        .innerJoin('u.role', 'r')
        .where('u.email=:email', { email })
        .select(['u.id', 'r'])
        .getOne(),
    );
    if (err) {
      throw new HttpException('error in db ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!data) {
      throw new HttpException('token not found ', HttpStatus.BAD_REQUEST);
    }

    return data;
  }
  private async saveUser(
    user: IUserRegisterDtoIn,
    queryRunner: QueryRunner,
  ): Promise<UsersEntity> {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const role = await this.getRole(1, queryRunner);

    const [err, retVal] = await to(
      queryRunner.manager.save(UsersEntity, {
        username: user.username,
        email: user.email,
        password: user.password,
        role: role,
      }),
    );
    if (err) {
      if (err.message.includes('duplicate')) {
        throw new HttpException('user is exists ', HttpStatus.CONFLICT);
      }
      throw new HttpException('error in db ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return retVal;
  }

  private async getRole(roleId: number, queryRunner: QueryRunner) {
    const [err, res] = await to(
      queryRunner.manager
        .createQueryBuilder(RolesEntity, 'r')
        .where('r.id = :roleId', { roleId })
        .select(['r'])
        .getOne(),
    );
    if (err) {
      throw new HttpException('error in db ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!res) {
      throw new HttpException('not found user ', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
