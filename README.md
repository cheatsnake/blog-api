# :newspaper: Blog API

Simple API for building cool blogs <br>
Crafted using `Nest.js` + `MongoDB`

## :mag: Overview
This API provides the ability to create simple blogs with markdown markup based on an already created system of posts and comments. For convenient blogging, there is an administrator authorization service with a set of secure routes. The comments service does not require registration, but all comments can be verified by administrators.

## :rocket: Launch server
1. Clone this repository
2. Create `.env` file with connection URI and JWT secret key
```
DATABASE_URI=mongodb://mongodb0.example.com:27017
JWT_SECRET=PasteYourJwtSecret
```
3. Install all packages
```sh
npm install
```
4. Run server for development/production
```sh
npm run start:dev
```
```sh
npm run start
```

## :whale: Launch using Docker
1. Build docker image
```sh
docker build . -t blog-api
```
2. Launch containter
```sh
docker run -p 3000:3000 --env-file .env --name server blog-api
```

## :page_facing_up: API usage
### :closed_lock_with_key: Auth for admins

| Method     | URI                             | Body (JSON)                                                                      |  Action                  |
|------------|---------------------------------|----------------------------------------------------------------------------------|--------------------------|
| `POST`     | /api/auth/register              | {<br> &emsp; "email": "example@mail.com",<br> &emsp; "password": "example" <br>} | Registration for admins  |
| `POST`     | /api/auth/login                 | {<br> &emsp; "email": "example@mail.com",<br> &emsp; "password": "example" <br>}  | Login for admins         |

### :postbox: Post service

| Method     | URI                             | Body (JSON)                                                                      |  Action                  |
|------------|---------------------------------|----------------------------------------------------------------------------------|--------------------------|
| `POST`     | /api/post/create             | {<br>&emsp; "category": "category",<br> &emsp; "title": "title", <br> &emsp; "image": "test.png", <br> &emsp; "tags": ["one", "two"], <br> &emsp; "content": "Hello World!"<br>}  | Create post _(For admins)_ |
| `GET`      | /api/post/`id`               | `none`                                                                           | Find post by id             |
| `GET`      | /api/post/withComments/`id`  | `none`                                                                           | Find post by id with comments  |
| `POST`     | /api/post/find/`id`          | {<br> &emsp; "category": "category",<br> &emsp; "limit": 100 <br>}               | Find posts by category        |
| `PATCH`    | /api/post/`id`               | {<br>&emsp; "category": "category",<br> &emsp; "title": "title", <br> &emsp; "image": "test.png", <br> &emsp; "tags": ["one", "two"], <br> &emsp; "content": "Hello World!"<br>} | Update post by id _(For admins)_ |
| `DELETE`   | /api/post/`id`               | `none`                                                                           | Delete post by id _(For admins)_ |

### :microphone: Comment service 

| Method     | URI                             | Body (JSON)                                                                      |  Action                  |
|------------|---------------------------------|----------------------------------------------------------------------------------|--------------------------|
| `POST`     | /api/comment/create             | {<br>&emsp; "author": "Author",<br> &emsp; "email": "test@mail.com",<br> &emsp; "content": "Hello World!",<br> &emsp; "postId": `id` <br>}  | Create comment for post  |
| `GET`      | /api/comment/`id`               | `none`                                                                           | Find comment by id         |
| `GET`      | /api/comment/byPost/`id`        | `none`                                                                           | Find comment by post id  |
| `GET`      | /api/comment/verified/`id`      | `none`                                                                           | Verified comment by id _(For admins)_         |
| `DELETE`   | /api/comment/`id`               | `none`                                                                           | Delete comment by id _(For admins)_   |


