import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthController } from "./auth.controller";
import { AdminModel } from "./admin.model";

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
    providers: [],
})
export class AuthModule {}
