import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { COMMENT_NOT_FOUND } from "./comment.constants";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UsePipes(new ValidationPipe())
    @Post("create")
    async create(@Body() dto: CreateCommentDto) {
        this.commentService.create(dto);
    }

    @Get("byPost/:postId")
    async findByPostId(@Param("postId") postId: string) {
        return this.commentService.findByPostId(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteById(@Param("id") id: string) {
        const deletedComment = await this.commentService.deleteById(id);
        if (!deletedComment) {
            throw new HttpException(COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
