import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { EMAIL_ALREADY_USE } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly adminService: AdminService,
        private readonly authService: AuthService
    ) {}

    @UsePipes(new ValidationPipe())
    @Post("register")
    async register(@Body() dto: AuthDto) {
        const admin = await this.adminService.findAdmin(dto.email);
        if (admin) throw new BadRequestException(EMAIL_ALREADY_USE);
        return await this.adminService.createAdmin(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    async login(@Body() { email, password }: AuthDto) {
        const admin = await this.authService.validateAdmin(email, password);
        return this.authService.login(admin.email);
    }
}
