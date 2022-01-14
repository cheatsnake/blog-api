import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { FindPostDto } from "./dto/find-post.dto";
import { PostModel } from "./post.model";

@Controller("post")
export class PostController {
    @Post("create")
    async create(@Body() dto: PostModel) {}

    @Get(":id")
    async findById(@Param("id") id: string) {}

    @Delete(":id")
    async deleteById(@Param("id") id: string) {}

    @Patch(":id")
    async updateById(@Param("id") id: string, @Body() dto: PostModel) {}

    @HttpCode(200)
    @Post("find")
    async findByCategory(@Body() dto: FindPostDto) {}
}
