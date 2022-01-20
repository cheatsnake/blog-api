import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { FindPostDto } from "./dto/find-post.dto";
import { POST_NOT_FOUND } from "./post.constants";
import { PostModel } from "./post.model";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("create")
    async create(@Body() dto: PostModel) {
        return this.postService.create(dto);
    }

    @Get(":id")
    async findById(@Param("id", IdValidationPipe) id: string) {
        const post = await this.postService.findById(id);
        if (!post) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
        return post;
    }

    @Get("withComments/:id")
    async findByIdWithComments(@Param("id", IdValidationPipe) id: string) {
        const post = await this.postService.findByIdWithComments(id);
        if (!post.length) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
        return post[0];
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteById(@Param("id", IdValidationPipe) id: string) {
        const deletedPost = await this.postService.deleteById(id);
        if (!deletedPost) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(":id")
    async updateById(
        @Param("id", IdValidationPipe) id: string,
        @Body() dto: PostModel
    ) {
        const updatedPost = await this.postService.updateById(id, dto);
        if (!updatedPost) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
        return updatedPost;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("find")
    async findByCategory(@Body() dto: FindPostDto) {
        return await this.postService.findByCategory(dto);
    }
}
