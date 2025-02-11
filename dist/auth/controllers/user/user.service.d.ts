import { JwtService } from "@nestjs/jwt";
import { DataSource, Repository } from "typeorm";
import { IUserRegisterDtoIn, UserLoginReqDto, UserLoginResDto } from "./user.dto";
import { UsersEntity } from "../../../@orm/models/auth/users.model";
export declare class AuthUserService {
    private dataSource;
    private readonly jwt;
    private repoUsers;
    constructor(dataSource: DataSource, jwt: JwtService, repoUsers: Repository<UsersEntity>);
    validUser(body: UserLoginReqDto): Promise<UsersEntity>;
    findUserData(user: UsersEntity): Promise<UsersEntity>;
    createUserToken(user: UsersEntity): Promise<UserLoginResDto>;
    registerUser(user: IUserRegisterDtoIn): Promise<string>;
}
