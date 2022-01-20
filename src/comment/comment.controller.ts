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
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { COMMENT_NOT_FOUND } from "./comment.constants";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UsePipes(new ValidationPipe())
    @Post("create")
    async create(@Body() dto: CreateCommentDto) {
        return await this.commentService.create(dto);
    }

    @Get("/:id")
    async findById(@Param("id", IdValidationPipe) id: string) {
        const comment = await this.commentService.findById(id);
        if (!comment) {
            throw new HttpException(COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return comment;
    }

    @UseGuards(JwtAuthGuard)
    @Get("verified/:id")
    async verifiedById(@Param("id", IdValidationPipe) id: string) {
        const verifiedComment = await this.commentService.verifiedById(id);
        if (!verifiedComment) {
            throw new HttpException(COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return verifiedComment;
    }

    @Get("byPost/:postId")
    async findByPostId(@Param("postId", IdValidationPipe) postId: string) {
        return await this.commentService.findByPostId(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteById(@Param("id", IdValidationPipe) id: string) {
        const deletedComment = await this.commentService.deleteById(id);
        if (!deletedComment) {
            throw new HttpException(COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
