import { JwtService } from '@nestjs/jwt';
import { DataSource, QueryRunner } from 'typeorm';
import { IUserRegisterDtoIn, UserLoginReqDto, UserLoginResDto } from './user.dto';
import { UsersEntity } from '../../../@orm/models/auth/users.model';
export declare class AuthUserService {
    private dataSource;
    private readonly jwt;
    constructor(dataSource: DataSource, jwt: JwtService);
    validUser(body: UserLoginReqDto, queryRunner: QueryRunner): Promise<UsersEntity>;
    createUserToken(res: UsersEntity): Promise<UserLoginResDto>;
    findUserData(res: UsersEntity, queryRunner: QueryRunner): Promise<UsersEntity>;
    registerUser(user: IUserRegisterDtoIn): Promise<void>;
    private checkEmail;
    private saveUser;
    private getRole;
}
