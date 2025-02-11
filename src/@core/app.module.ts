import { Module } from "@nestjs/common";
import { OrmModule } from "../@orm/module/orm.module";
import { AuthModule } from "../auth/module/auth.module";
import { DataSource } from "typeorm";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [OrmModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
