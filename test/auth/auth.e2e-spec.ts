import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthDto } from "../../src/auth/dto/auth.dto";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { disconnect } from "mongoose";

const authDto: AuthDto = {
    email: Date.now().toString() + "@test.com",
    password: "test@test",
};

describe("AuthController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/auth/register (POST) - success", async () => {
        return request(app.getHttpServer())
            .post("/auth/register")
            .send(authDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                const hash: string = body.passwordHash;
                expect(hash).toBeDefined();
            });
    });

    it("/auth/register (POST) - fail validation", async () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send({ email: "test", password: "test" })
            .expect(400, {
                statusCode: 400,
                message: [
                    "email must be an email",
                    "password must be longer than or equal to 6 characters",
                ],
                error: "Bad Request",
            });
    });

    it("/auth/login (POST) - success", async () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send(authDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                const token: string = body.access_token;
                expect(token).toBeDefined();
            });
    });

    it("/auth/login (POST) - fail, wrong password", () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send({ ...authDto, password: "wrongpass" })
            .expect(401, {
                statusCode: 401,
                message: "Wrong password",
                error: "Unauthorized",
            });
    });

    it("/auth/login (POST) - fail, not found email", async () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send({ ...authDto, email: "notfound@test.com" })
            .expect(401, {
                statusCode: 401,
                message: "This email in not registered",
                error: "Unauthorized",
            });
    });

    it("/auth/login (POST) - fail validation", () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send({ email: "test", password: "test" })
            .expect(400, {
                statusCode: 400,
                message: [
                    "email must be an email",
                    "password must be longer than or equal to 6 characters",
                ],
                error: "Bad Request",
            });
    });

    afterAll(async () => {
        disconnect();
        await app.close();
    });
});
