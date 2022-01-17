import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthController } from "./auth.controller";
import { AdminModel } from "./admin.model";
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: AdminModel,
                schemaOptions: {
                    collection: "Admin auth",
                },
            },
        ]),
    ],
    providers: [AuthService],
})
export class AuthModule {}
