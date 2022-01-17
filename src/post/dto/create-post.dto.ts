import { IsArray, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    category: string;

    @IsString()
    title: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    image: string;

    @IsString()
    content: string;
}
