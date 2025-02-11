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
exports.AuthUserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const typeorm_1 = require("typeorm");
const user_service_1 = require("./user.service");
let AuthUserController = class AuthUserController {
    constructor(authService, dataSource) {
        this.authService = authService;
        this.dataSource = dataSource;
    }
    async login(body) {
        let response;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const validUser = await this.authService.validUser(body, queryRunner);
            const user = await this.authService.findUserData(validUser, queryRunner);
            response = await this.authService.createUserToken(user);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async register(body) {
        return await this.authService.registerUser(body);
    }
};
exports.AuthUserController = AuthUserController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginReqDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.IUserRegisterDtoIn]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "register", null);
exports.AuthUserController = AuthUserController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.AuthUserService,
        typeorm_1.DataSource])
], AuthUserController);
//# sourceMappingURL=user.controller.js.map