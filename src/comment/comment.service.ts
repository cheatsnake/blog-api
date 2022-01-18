import { Injectable } from "@nestjs/common";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { CommentModel } from "./comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel)
        private readonly commentModel: ModelType<CommentModel>
    ) {}

    async create(dto: CreateCommentDto) {
        return await this.commentModel.create({ ...dto, verified: false });
    }

    async findById(id: string) {
        return await this.commentModel.findById(id).exec();
    }

    async verifiedById(id: string) {
        const comment = await this.findById(id);
        comment.verified = true;
        return await this.commentModel.findByIdAndUpdate(id, comment, {
            new: true,
        });
    }

    async findByPostId(postId: string): Promise<DocumentType<CommentModel>[]> {
        return this.commentModel
            .find({ postId: new Types.ObjectId(postId) })
            .exec();
    }

    async deleteById(id: string): Promise<DocumentType<CommentModel> | null> {
        return await this.commentModel.findByIdAndDelete(id).exec();
    }
}
