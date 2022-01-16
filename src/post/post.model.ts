import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
    @prop()
    category: string;

    @prop()
    title: string;

    @prop({ type: () => [String] })
    tags: string[];

    @prop()
    image: string;

    @prop()
    content: string;
}
