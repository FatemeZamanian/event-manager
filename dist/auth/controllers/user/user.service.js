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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const users_model_1 = require("../../../@orm/models/auth/users.model");
const typeorm_2 = require("@nestjs/typeorm");
let AuthUserService = class AuthUserService {
    constructor(dataSource, jwt, repoUsers) {
        this.dataSource = dataSource;
        this.jwt = jwt;
        this.repoUsers = repoUsers;
    }
    async validUser(body) {
        const email = body.email.toLowerCase();
        try {
            const user = await this.repoUsers
                .createQueryBuilder("u")
                .where("LOWER(u.email) = :email", { email })
                .select(["u"])
                .getOne();
            if (!user) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (!validPassword) {
                throw new common_1.HttpException("Wrong password", common_1.HttpStatus.FORBIDDEN);
            }
            return user;
        }
        catch (err) {
            throw new common_1.HttpException("Database error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findUserData(user) {
        try {
            const result = await this.repoUsers
                .createQueryBuilder("u")
                .where("u.id = :id", { id: user.id })
                .select(["u"])
                .getOne();
            if (!result) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            return result;
        }
        catch (err) {
            throw new common_1.HttpException("Database error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUserToken(user) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.roleId,
        };
        return { token: this.jwt.sign(payload) };
    }
    async registerUser(user) {
        if (user.password.length < 6) {
            throw new common_1.HttpException("Password must be longer than 6 characters", common_1.HttpStatus.BAD_REQUEST);
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
        }
        catch (err) {
            if (err?.code === "23505") {
                throw new common_1.HttpException("Username or email already exists", common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException("Database error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return "User created successfully";
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(users_model_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService,
        typeorm_1.Repository])
], AuthUserService);
//# sourceMappingURL=user.service.js.map