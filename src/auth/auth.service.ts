import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";
import { AdminModel } from "./admin.model";
import { AdminService } from "./admin.service";
import { EMAIL_NOT_FOUND, WRONG_PASSWORD } from "./auth.constants";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminModel)
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) {}

    async validateAdmin(
        email: string,
        password: string
    ): Promise<Pick<AdminModel, "email">> {
        const admin = await this.adminService.findAdmin(email);
        if (!admin) throw new UnauthorizedException(EMAIL_NOT_FOUND);

        const isCorrectPassword = await compare(password, admin.passwordHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD);
        }

        return { email: admin.email };
    }

    async login(email: string) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
