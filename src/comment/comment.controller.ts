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
import { CommentModel } from "./comment.model";

@Controller("comment")
export class CommentController {
    @Post("create")
    async create(@Body() dto: CommentModel) {}

    @Get("byPost/:postId")
    async findByPostId(@Param("postId") postId: string) {}

    @Delete(":id")
    async deleteById(@Param("id") id: string) {}
}
