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
exports.RolesEntity = void 0;
const typeorm_1 = require("typeorm");
const consts_1 = require("../../consts");
const users_model_1 = require("./users.model");
let RolesEntity = class RolesEntity {
};
exports.RolesEntity = RolesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], RolesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", type: "enum", nullable: false, enum: consts_1.RoleType }),
    __metadata("design:type", String)
], RolesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_model_1.UsersEntity, (user) => user.role),
    __metadata("design:type", Array)
], RolesEntity.prototype, "users", void 0);
exports.RolesEntity = RolesEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "rols",
    })
], RolesEntity);
//# sourceMappingURL=roles.model.js.map