import { IsArray, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @MinLength(1)
    @IsString({})
    category: string;

    @MinLength(1)
    @IsString()
    title: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @MinLength(1)
    @IsString()
    image: string;

    @MinLength(1)
    @IsString()
    content: string;
}
