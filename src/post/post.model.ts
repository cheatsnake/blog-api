import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
    @prop({ required: true })
    category: string;

    @prop({ required: true })
    title: string;

    @prop({ type: () => [String] })
    tags: string[];

    @prop({ required: true })
    image: string;

    @prop({ required: true })
    content: string;
}
