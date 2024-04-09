#### WORKFLOW

- [x] create client (NextJS)
- [x] create server (NestJS)
- [x] set up docker environment
- [x] connect client to server (Hello from API)
- [x] connect server to database (PostgreSQL & pgAdmin via Docker)
- [x] integrate test tools for client & server (eslint & prettier)
  - [x] server: both integrated in NestJS
  - [x] client: eslint integrated in NextJS, only need to install prettier
- [x] install & run .husky (pre-commit)
- [x] add & run github actions (for pull requests on dev)
- [x] use agile methods (Gitub projects)
  - [x] create issues w/ user stories
  - [x] create Kanban table
- [x] create db models (MERISE, data dictionary, rules)
- [x] set up Prisma ORM (config both on server & Docker)
  - [x] server: install, add config in package.json & schema.prisma, run npx prisma generate
  - [x] Docker: install & run npx prisma generate
- [x] set up Swagger (API Documentation)
- [x] Rest API
  - [x] artists
  - [x] songs
  - [ ] users
  - [x] genres
- [x] run server tests w/ Jest (to check API routes ok)
- [x] upload files on server (images, audios)
- [x] CRUD for songs on client + player + UI
- [x] run client tests w/ Cypress
- [x] automate worklow w/ tests for CI

#### SETUP

- when cloning a repo from github: add .env file & run 'npx prisma generate'
