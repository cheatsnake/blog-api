import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { genSalt, hash } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";
import { AdminModel } from "./admin.model";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminModel)
        private readonly adminModel: ModelType<AdminModel>
    ) {}

    async createAdmin(dto: AuthDto) {
        const salt = await genSalt(10);
        const newAdmin = new this.adminModel({
            email: dto.email,
            passwordHash: await hash(dto.password, salt),
        });

        return newAdmin.save();
    }

    async findAdmin(email: string) {
        return this.adminModel.findOne({ email }).exec();
    }
}
