import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthController } from "./auth.controller";
import { AdminModel } from "./admin.model";
import { AuthService } from "./auth.service";
import { AdminService } from "./admin.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJWTConfig } from "src/configs/jwt.config";

@Module({
    controllers: [AuthController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: AdminModel,
                schemaOptions: {
                    collection: "Admin-auth",
                },
            },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig,
        }),
    ],
    providers: [AuthService, AdminService],
})
export class AuthModule {}
