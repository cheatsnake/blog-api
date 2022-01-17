import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { EMAIL_ALREADY_USE } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post("register")
    async register(@Body() dto: AuthDto) {
        const admin = await this.authService.findAdmin(dto.email);
        if (admin) throw new BadRequestException(EMAIL_ALREADY_USE);
        return await this.authService.createAdmin(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    async login(@Body() dto: AuthDto) {}
}
