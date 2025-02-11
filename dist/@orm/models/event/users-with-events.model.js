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
exports.UsersWithEventsEntity = void 0;
const typeorm_1 = require("typeorm");
const consts_1 = require("../../consts");
const events_model_1 = require("./events.model");
const users_model_1 = require("../auth/users.model");
let UsersWithEventsEntity = class UsersWithEventsEntity {
};
exports.UsersWithEventsEntity = UsersWithEventsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UsersWithEventsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UsersWithEventsEntity.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        nullable: false,
        enum: consts_1.PresenceStatus,
        default: consts_1.PresenceStatus.ABSENCE,
    }),
    __metadata("design:type", String)
], UsersWithEventsEntity.prototype, "presenceStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => events_model_1.EventsEntity, (event) => event.eventsWithUser),
    __metadata("design:type", events_model_1.EventsEntity)
], UsersWithEventsEntity.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UsersWithEventsEntity.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_model_1.UsersEntity, (user) => user.eventsWithUser),
    __metadata("design:type", users_model_1.UsersEntity)
], UsersWithEventsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UsersWithEventsEntity.prototype, "userId", void 0);
exports.UsersWithEventsEntity = UsersWithEventsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users-with-events',
    })
], UsersWithEventsEntity);
//# sourceMappingURL=users-with-events.model.js.map