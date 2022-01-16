import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { CommentController } from "./comment.controller";
import { CommentModel } from "./comment.model";

@Module({
    controllers: [CommentController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CommentModel,
                schemaOptions: {
                    collection: "Comment",
                },
            },
        ]),
    ],
    providers: [],
})
export class CommentModule {}
