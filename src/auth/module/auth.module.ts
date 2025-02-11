import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "../../@orm/models/auth/users.model";
import { RolesEntity } from "../../@orm/models/auth/roles.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthUserController } from "../controllers/user/user.controller";
import { AuthUserService } from "../controllers/user/user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        console.log("JWT_SECRET from ConfigService:", secret); // Debug log
        return {
          secret: secret || "secret",
          signOptions: { expiresIn: "1d" },
        };
      },
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(
      {
        path: "api/auth/user/register",
        method: RequestMethod.POST,
      },
      {
        path: "api/auth/user/login",
        method: RequestMethod.POST,
      }
    );
  }
}
