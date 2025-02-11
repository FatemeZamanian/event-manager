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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const roles_model_1 = require("./roles.model");
const events_model_1 = require("../event/events.model");
const users_with_events_model_1 = require("../event/users-with-events.model");
let UsersEntity = class UsersEntity {
};
exports.UsersEntity = UsersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_model_1.RolesEntity, (role) => role.users),
    __metadata("design:type", roles_model_1.RolesEntity)
], UsersEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => events_model_1.EventsEntity, (event) => event.admin),
    __metadata("design:type", Array)
], UsersEntity.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_with_events_model_1.UsersWithEventsEntity, (uwe) => uwe.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "eventsWithUser", void 0);
exports.UsersEntity = UsersEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], UsersEntity);
//# sourceMappingURL=users.model.js.map