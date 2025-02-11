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
exports.EventsEntity = void 0;
const typeorm_1 = require("typeorm");
const users_model_1 = require("../auth/users.model");
const users_with_events_model_1 = require("./users-with-events.model");
let EventsEntity = class EventsEntity {
};
exports.EventsEntity = EventsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], EventsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", type: "text", nullable: false }),
    __metadata("design:type", String)
], EventsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "registration_start_date", type: "date", nullable: false }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "registrationStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "registration_end_date", type: "date", nullable: false }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "registrationEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_date", type: "date", nullable: false }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date", type: "date", nullable: false }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_model_1.UsersEntity, (admin) => admin.event),
    (0, typeorm_1.JoinColumn)({ name: "admin_id" }),
    __metadata("design:type", users_model_1.UsersEntity)
], EventsEntity.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "admin_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], EventsEntity.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_with_events_model_1.UsersWithEventsEntity, (uwe) => uwe.events),
    __metadata("design:type", Array)
], EventsEntity.prototype, "eventsWithUser", void 0);
exports.EventsEntity = EventsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "events",
    })
], EventsEntity);
//# sourceMappingURL=events.model.js.map