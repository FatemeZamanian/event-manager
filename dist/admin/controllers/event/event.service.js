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
exports.AdminEventService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const await_to_js_1 = require("await-to-js");
const typeorm_1 = require("typeorm");
const events_model_1 = require("../../../@orm/models/event/events.model");
const typeorm_2 = require("@nestjs/typeorm");
let AdminEventService = class AdminEventService {
    constructor(dataSource, jwt, repoEvents) {
        this.dataSource = dataSource;
        this.jwt = jwt;
        this.repoEvents = repoEvents;
    }
    async createEvent(req, event) {
        const adminId = req.body.jwt.id;
        try {
            await (0, await_to_js_1.default)(this.repoEvents.save({
                adminId: adminId,
                title: event.title,
                description: event.description,
                registrationStartDate: event.registrationStartDate,
                registrationEndDate: event.registrationEndDate,
                startDate: event.startDate,
                endDate: event.endDate,
            }));
        }
        catch (err) {
            throw new common_1.HttpException('internal server error ', common_1.HttpStatus.NOT_FOUND);
        }
        finally {
        }
    }
};
exports.AdminEventService = AdminEventService;
exports.AdminEventService = AdminEventService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(events_model_1.EventsEntity)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService,
        typeorm_1.Repository])
], AdminEventService);
//# sourceMappingURL=event.service.js.map