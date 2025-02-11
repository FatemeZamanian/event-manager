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
exports.AdminEventController = void 0;
const common_1 = require("@nestjs/common");
const event_dto_1 = require("./event.dto");
const event_service_1 = require("./event.service");
const swagger_1 = require("@nestjs/swagger");
let AdminEventController = class AdminEventController {
    constructor(adminEventService) {
        this.adminEventService = adminEventService;
    }
    async createEvent(req, event) {
        return await this.adminEventService.createEvent(req, event);
    }
    async submitPresence(req, param) {
    }
};
exports.AdminEventController = AdminEventController;
__decorate([
    (0, common_1.Post)("/create-event"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, event_dto_1.eventDtoIn]),
    __metadata("design:returntype", Promise)
], AdminEventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Patch)("/submit-presence/:status"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminEventController.prototype, "submitPresence", null);
exports.AdminEventController = AdminEventController = __decorate([
    (0, swagger_1.ApiTags)("Admin / Events"),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [event_service_1.AdminEventService])
], AdminEventController);
//# sourceMappingURL=event.controller.js.map