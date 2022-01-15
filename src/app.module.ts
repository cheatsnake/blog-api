import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PostController } from "./post/post.controller";
import { CommentController } from "./comment/comment.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { mongoConfig } from "./configs/mongo.config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongoConfig,
        }),
    ],
    controllers: [AuthController, PostController, CommentController],
    providers: [],
})
export class AppModule {}
