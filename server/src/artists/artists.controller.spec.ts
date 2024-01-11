import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppModule } from '../app.module';
import * as supertest from 'supertest';

describe('ArtistsController', () => {
  let controller: ArtistsController;
  let app;
  let server;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ArtistsController],
      providers: [ArtistsService, PrismaService],
    }).compile();

    controller = moduleFixture.get<ArtistsController>(ArtistsController);
    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await prismaService.$connect();
    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new artist - POST /api/artists', async () => {
    const artist = {
      name: 'Linkin Park',
    };

    const response = await supertest(server)
      .post('/api/artists')
      .send({ name: artist.name })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(artist.name);
    console.log(response.body);
  });

  it('should get all artists - GET /api/artists', async () => {
    // const artists = await controller.findAll();
    // expect(Array.isArray(artists)).toBeTruthy();

    const response = await supertest(server).get('/api/artists').expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should get an artist - GET /api/artists/:id', async () => {
    const artistId = 30;

    const response = await supertest(server)
      .get(`/api/artists/${artistId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(artistId);

    console.log(response.body);
  });

  it('should update an artist - PATCH /api/artists/:id', async () => {
    const artistId = 33;

    const artistPatch = {
      name: 'Justin Bieber',
    };

    const response = await supertest(server)
      .patch(`/api/artists/${artistId}`)
      .send(artistPatch)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(artistId);
    expect(response.body.name).toBe(artistPatch.name);

    console.log(response.body);
  });

  it('should delete an artist - DELETE /api/artists/:id', async () => {
    const artistId = 30;

    const response = await supertest(server)
      .delete(`/api/artists/${artistId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(artistId);
  });
});
