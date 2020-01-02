# Express TypeScript Boilerplate

This repo can be used as a starting point for backend development with Nodejs. It comes bundled with Docker and is CI/CD optimized. The development environment uses `docker-compose` to start dependent services like mongo.

A few things to note in the project:

- **[Dockerfile](./Dockerfile)** - Dockerfile to generate docker builds.
- **[docker-compose](./docker-compose.yml)** - Docker compose script to start service in production mode.
- **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
- **[Mongo Connection Helper](./src/mongo-connection.ts)** - A helper class to connect to MongoDB reliably.
- **[Middleware for easier async/await](./src/middleware/handle-error-middleware.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
- **[OpenAPI 3.0 Spec](./openapi.json)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/dev/api-docs`
- **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
- **[Winston Logger](#logging)** - Uses winston as the logger for the application.
- **ESLINT + Prettier** - ESLINT is configured with Prettier for easy linting.
- **Jest** - Using Jest for running test cases
- **Travis CI** - Pre-configured to a sample Travis CI pipepline for linting, building and running the test suite.

## Installation

### 1. Install dependencies

```sh
npm i
```

## Development

### Start dev server

Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```sh
npm run dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000`
- ⚙️**Swagger UI** at `http://localhost:3000/dev/api-docs`
- 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment

### 1. Run with docker-compose

```sh
docker-compose up
```

### 2. Run with docker

```sh
docker build -t api-server .
docker run -t -i -p 3000:3000 api-server
```

### 3. Build and run

```sh
npm run build && npm run start
```

---

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.example` to start with.

| Var Name                  | Type   | Default                           | Description                             |
| ------------------------- | ------ | --------------------------------- | --------------------------------------- |
| NODE_ENV                  | string | `development`                     | API runtime environment. eg: `staging`  |
| PORT                      | number | `3000`                            | Port to run the API server on           |
| MONGO_URL                 | string | `mongodb://localhost:27017/books` | URL for MongoDB                         |
| SECRET_HEX                | string | `827d263847500d926a520b...`       | HEX string to secure JWT                |
| ACCESS_TOKEN_LIFETIME_MIN | number | `60`                              | Access token TTL in mins                |
| BCRYPT_N_ROUNDS           | number | `100`                             | Number of round to generate Bcrypt salt |

## Logging

The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.

- All logs are saved in `./logs` directory and at `/logs` in the docker container.
- The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
- Console messages are prettified
- Each line in error log file is a stringified JSON.

### Directory Structure

```sh
+-- scripts
|   +-- dev.sh
+-- src
|   +-- controllers
|   |   +-- book
|   |   |   +-- add.ts
|   |   |   +-- all.ts
|   |   |   +-- index.ts
|   |   |   +-- search.ts
|   +-- middleware
|   |   +-- handle-error-middleware.ts
|   +-- models
|   |   +-- Book.ts
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env
+-- .env.example
+-- .eslintrc.js
+-- .gitignore
+-- .prettierrc.js
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
