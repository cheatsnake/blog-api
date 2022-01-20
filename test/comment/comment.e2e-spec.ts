import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { disconnect, Types } from "mongoose";
import { AppModule } from "../../src/app.module";
import { AuthDto } from "../../src/auth/dto/auth.dto";
import { CreateCommentDto } from "../../src/comment/dto/create-comment.dto";
import { CreatePostDto } from "../../src/post/dto/create-post.dto";
import * as request from "supertest";

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

const commentDto: CreateCommentDto = {
    author: "test",
    email: "test@test.com",
    content: "test",
    postId: "",
};

const fakePostId = "fake";
const fakeCommentId = new Types.ObjectId().toHexString();

describe("CommentController (e2e)", () => {
    let app: INestApplication;
    let postId: string;
    let commentId: string;
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

        const testPost = await request(app.getHttpServer())
            .post("/post/create")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(postDto);

        postId = testPost.body._id;
    });

    it("/comment/create (POST) - success", async () => {
        return request(app.getHttpServer())
            .post("/comment/create")
            .send({ ...commentDto, postId: postId })
            .expect(201)
            .then(({ body }: request.Response) => {
                commentId = body._id;
                expect(commentId).toBeDefined();
            });
    });

    it("/comment/create (POST) - fail", () => {
        return request(app.getHttpServer())
            .post("/comment/create")
            .send({ ...commentDto, email: "test" })
            .expect(400, {
                statusCode: 400,
                message: ["email must be an email"],
                error: "Bad Request",
            });
    });

    it("/comment/:id (GET) - success", async () => {
        return request(app.getHttpServer())
            .get(`/comment/${commentId}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body._id).toBe(commentId);
            });
    });

    it("/comment/:id (GET) - fail", async () => {
        return request(app.getHttpServer())
            .get(`/comment/${fakeCommentId}`)
            .expect(404);
    });

    it("/comment/byPost/:postId (GET) - success", async () => {
        return request(app.getHttpServer())
            .get(`/comment/byPost/${postId}`)
            .expect(200);
    });

    it("/comment/byPost/:postId (GET) - fail", async () => {
        return request(app.getHttpServer())
            .get(`/comment/byPost/${fakePostId}`)
            .expect(400);
    });

    it("/comment/verified/:id (GET)", async () => {
        return request(app.getHttpServer())
            .get(`/comment/verified/${commentId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.verified).toBe(true);
            });
    });

    it("/comment/:id (DELETE)", () => {
        return request(app.getHttpServer())
            .delete(`/comment/${commentId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200);
    });

    afterEach(async () => {
        await request(app.getHttpServer())
            .delete("/post/" + postId)
            .set("Authorization", `Bearer ${accessToken}`);
    });

    afterAll(async () => {
        disconnect();
        await app.close();
    });
});
