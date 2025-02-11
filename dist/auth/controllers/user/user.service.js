"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const await_to_js_1 = require("await-to-js");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const users_model_1 = require("../../../@orm/models/auth/users.model");
const roles_model_1 = require("../../../@orm/models/auth/roles.model");
let AuthUserService = class AuthUserService {
    constructor(dataSource, jwt) {
        this.dataSource = dataSource;
        this.jwt = jwt;
    }
    async validUser(body, queryRunner) {
        const email = body.email.toLowerCase();
        const [err, res] = await (0, await_to_js_1.default)(queryRunner.manager
            .createQueryBuilder(users_model_1.UsersEntity, 'u')
            .where('LOWER(u.email) = :email', { email })
            .select(['u'])
            .getOne());
        if (err) {
            throw new common_1.HttpException('error in db ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!res) {
            throw new common_1.HttpException('not found user', common_1.HttpStatus.NOT_FOUND);
        }
        const validPassword = await bcrypt.compare(body.password, res.password);
        if (!validPassword) {
            throw new common_1.HttpException('wrong password ', common_1.HttpStatus.FORBIDDEN);
        }
        return res;
    }
    async createUserToken(res) {
        const obj = {
            id: res.id,
            username: res.username,
            email: res.email,
            role: res.roleId,
        };
        const retVal = {
            token: await this.jwt.sign(obj),
        };
        return retVal;
    }
    async findUserData(res, queryRunner) {
        const userId = res.id;
        const [err, result] = await (0, await_to_js_1.default)(queryRunner.manager
            .createQueryBuilder(users_model_1.UsersEntity, 'u')
            .where('u.id = :userId', { userId })
            .select(['u'])
            .getOne());
        if (err) {
            throw new common_1.HttpException('error in db ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!result) {
            throw new common_1.HttpException('not found user', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async registerUser(user) {
        if (user.password.length < 6) {
            throw new common_1.HttpException('password must be longer than 6 character', common_1.HttpStatus.BAD_REQUEST);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.saveUser(user, queryRunner);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err.message.includes('duplicate')) {
                throw new common_1.HttpException('username or email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('not found user', common_1.HttpStatus.NOT_FOUND);
        }
        finally {
            await queryRunner.release();
        }
    }
    async checkEmail(inp, queryRunner) {
        const email = inp.toLocaleLowerCase();
        const [err, data] = await (0, await_to_js_1.default)(queryRunner.manager
            .createQueryBuilder(users_model_1.UsersEntity, 'u')
            .innerJoin('u.role', 'r')
            .where('u.email=:email', { email })
            .select(['u.id', 'r'])
            .getOne());
        if (err) {
            throw new common_1.HttpException('error in db ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!data) {
            throw new common_1.HttpException('token not found ', common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async saveUser(user, queryRunner) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        const role = await this.getRole(1, queryRunner);
        const [err, retVal] = await (0, await_to_js_1.default)(queryRunner.manager.save(users_model_1.UsersEntity, {
            username: user.username,
            email: user.email,
            password: user.password,
            role: role,
        }));
        if (err) {
            if (err.message.includes('duplicate')) {
                throw new common_1.HttpException('user is exists ', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('error in db ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return retVal;
    }
    async getRole(roleId, queryRunner) {
        const [err, res] = await (0, await_to_js_1.default)(queryRunner.manager
            .createQueryBuilder(roles_model_1.RolesEntity, 'r')
            .where('r.id = :roleId', { roleId })
            .select(['r'])
            .getOne());
        if (err) {
            throw new common_1.HttpException('error in db ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!res) {
            throw new common_1.HttpException('not found user ', common_1.HttpStatus.NOT_FOUND);
        }
        return res;
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService])
], AuthUserService);
//# sourceMappingURL=user.service.js.map