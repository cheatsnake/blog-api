import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
    @MaxLength(24)
    @MinLength(3)
    @IsString()
    author: string;

    @IsEmail()
    email: string;

    @IsString()
    content: string;

    @IsString()
    postId: string;
}
