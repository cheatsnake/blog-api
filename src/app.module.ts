import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, PostController, CommentController],
  providers: [AppService],
})
export class AppModule {}
