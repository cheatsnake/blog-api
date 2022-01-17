import { IsNumber, IsString, Min } from "class-validator";

export class FindPostDto {
    @IsString()
    category: string;

    @Min(1)
    @IsNumber()
    limit: number;
}
