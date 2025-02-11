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
exports.IUserRegisterDtoIn = exports.UserLoginReqDto = exports.UserLoginResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserLoginResDto {
}
exports.UserLoginResDto = UserLoginResDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginResDto.prototype, "token", void 0);
class UserLoginReqDto {
}
exports.UserLoginReqDto = UserLoginReqDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginReqDto.prototype, "password", void 0);
class IUserRegisterDtoIn {
}
exports.IUserRegisterDtoIn = IUserRegisterDtoIn;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IUserRegisterDtoIn.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IUserRegisterDtoIn.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IUserRegisterDtoIn.prototype, "password", void 0);
//# sourceMappingURL=user.dto.js.map