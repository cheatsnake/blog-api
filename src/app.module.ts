import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PostController } from "./post/post.controller";
import { CommentController } from "./comment/comment.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { mongoConfig } from "./configs/mongo.config";
import { AuthModule } from "./auth/auth.module";
import { CommentModule } from "./comment/comment.module";
import { PostModule } from "./post/post.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongoConfig,
        }),
        AuthModule,
        CommentModule,
        PostModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
