import { IUserRegisterDtoIn, UserLoginReqDto, UserLoginResDto } from './user.dto';
import { DataSource } from 'typeorm';
import { AuthUserService } from './user.service';
export declare class AuthUserController {
    private readonly authService;
    private dataSource;
    constructor(authService: AuthUserService, dataSource: DataSource);
    login(body: UserLoginReqDto): Promise<UserLoginResDto>;
    register(body: IUserRegisterDtoIn): Promise<void>;
}
