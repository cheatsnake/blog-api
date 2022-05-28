import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";
import { disconnect, Types } from "mongoose";
import { AuthDto } from "../../src/auth/dto/auth.dto";
import { CreatePostDto } from "../../src/post/dto/create-post.dto";
import { FindPostDto } from "../../src/post/dto/find-post.dto";

const authDto: AuthDto = {
    email: "test@test.com",
    password: "test@test",
};

const postDto: CreatePostDto = {
    category: "test",
    title: "test",
    tags: ["test"],
    image: "test",
    content: "test",
};

const findPostDto: FindPostDto = {
    category: "test",
    limit: 1,
};

const fakePostId = new Types.ObjectId().toHexString();

describe("PostController (e2e)", () => {
    let app: INestApplication;
    let postId: string;
    let accessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        await request(app.getHttpServer()).post("/auth/register").send(authDto);

        const testAdmin = await request(app.getHttpServer())
            .post("/auth/login")
            .send(authDto);

        accessToken = testAdmin.body.access_token;
    });

    it("/post (POST)", async () => {
        return request(app.getHttpServer())
            .post("/post")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(postDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                postId = body._id;
                expect(postId).toBeDefined();
            });
    });

    it("/post/:id (GET)", async () => {
        return request(app.getHttpServer())
            .get(`/post/${postId}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.createdAt).toBeDefined();
            });
    });

    it("/post/:id (GET) - fail, not found", async () => {
        return request(app.getHttpServer())
            .get(`/post/${fakePostId}`)
            .expect(404, {
                statusCode: 404,
                message: "Post not found",
                error: "Not Found",
            });
    });

    it("/post/:id (GET) - fail, incorrect id", async () => {
        return request(app.getHttpServer())
            .get(`/post/1111111111`)
            .expect(400, {
                statusCode: 400,
                message: "Incorrect item id",
                error: "Bad Request",
            });
    });

    it("/post/withComments/:id (GET)", async () => {
        return request(app.getHttpServer())
            .get(`/post/withComments/${postId}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.comments).toBeDefined();
            });
    });

    it("/post/withComments/:id (GET) - fail, not found", async () => {
        return request(app.getHttpServer())
            .get(`/post/withComments/${fakePostId}`)
            .expect(404, {
                statusCode: 404,
                message: "Post not found",
                error: "Not Found",
            });
    });

    it("/post/withComments/:id (GET) - fail, incorrect id", async () => {
        return request(app.getHttpServer())
            .get(`/post/withComments/1111111111`)
            .expect(400, {
                statusCode: 400,
                message: "Incorrect item id",
                error: "Bad Request",
            });
    });

    it("/post/find (POST)", async () => {
        return request(app.getHttpServer())
            .post(`/post/find`)
            .send(findPostDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body[0].category).toBe(findPostDto.category);
            });
    });

    it("/post/:id (PATCH)", async () => {
        return request(app.getHttpServer())
            .patch(`/post/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ ...postDto, content: "update" })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.content).toBe("update");
            });
    });

    it("/post/:id (DELETE)", () => {
        return request(app.getHttpServer())
            .delete(`/post/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200);
    });

    it("/post/:id (DELETE) - fail", async () => {
        return request(app.getHttpServer())
            .delete(`/post/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, {
                statusCode: 404,
                message: "Post not found",
                error: "Not Found",
            });
    });

    afterAll(async () => {
        disconnect();
        await app.close();
    });
});
