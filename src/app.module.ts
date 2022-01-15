import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PostController } from "./post/post.controller";
import { CommentController } from "./comment/comment.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AuthController, PostController, CommentController],
    providers: [],
})
export class AppModule {}
