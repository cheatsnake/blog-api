import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { CommentModel } from "src/comment/comment.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostDto } from "./dto/find-post.dto";
import { PostModel } from "./post.model";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(PostModel)
        private readonly postModel: ModelType<PostModel>
    ) {}

    async create(dto: CreatePostDto) {
        return this.postModel.create(dto);
    }

    async findById(id: string) {
        return await this.postModel.findById(id).exec();
    }

    async findByIdWithComments(id: string) {
        return this.postModel
            .aggregate()
            .match({ _id: new Types.ObjectId(id) })
            .lookup({
                from: "Comment",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
            })
            .exec() as unknown as PostModel &
            {
                comments: CommentModel[];
            }[];
    }

    async deleteById(id: string) {
        return await this.postModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreatePostDto) {
        return this.postModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findByCategory(dto: FindPostDto) {
        return this.postModel
            .find({ category: dto.category })
            .limit(dto.limit)
            .select("-content -tags");
    }
}
