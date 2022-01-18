import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
    @prop()
    author: string;

    @prop()
    email: string;

    @prop()
    content: string;

    @prop()
    postId: Types.ObjectId;

    @prop()
    verified: boolean;
}
