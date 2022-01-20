import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
    @prop({ required: true })
    author: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    content: string;

    @prop({ required: true })
    postId: Types.ObjectId;

    @prop()
    verified: boolean;
}
