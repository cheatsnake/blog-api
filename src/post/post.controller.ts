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
} from "@nestjs/common";
import { FindPostDto } from "./dto/find-post.dto";
import { POST_NOT_FOUND } from "./post.constants";
import { PostModel } from "./post.model";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("create")
    async create(@Body() dto: PostModel) {
        return this.postService.create(dto);
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        const post = await this.postService.findById(id);
        if (!post) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
        return post;
    }

    @Delete(":id")
    async deleteById(@Param("id") id: string) {
        const deletedPost = await this.postService.deleteById(id);
        if (!deletedPost) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
    }

    @Patch(":id")
    async updateById(@Param("id") id: string, @Body() dto: PostModel) {
        const updatedPost = await this.postService.updateById(id, dto);
        if (!updatedPost) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
        return updatedPost;
    }

    @HttpCode(200)
    @Post("find")
    async findByCategory(@Body() dto: FindPostDto) {
        return await this.postService.findByCategory(dto);
    }
}
