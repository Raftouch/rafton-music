import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { CreateArtistDto } from './dto/create-artist.dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as faker from 'faker';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ArtistsController', () => {
  let controller: ArtistsController;
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ArtistsController],
      providers: [ArtistsService, PrismaService],
    }).compile();

    controller = moduleFixture.get<ArtistsController>(ArtistsController);
    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    // await prismaService.$connect();
    await app.init();
  });

  afterAll(async () => {
    // await prismaService.$disconnect();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new artist - POST /api/artists', async () => {
    const createArtistDto: CreateArtistDto = {
      name: faker.name.findName(),
    };

    const createResponse = await request(app.getHttpServer())
      .post('/api/artists')
      .send(createArtistDto)
      // .set('Content-Type', 'application/json')
      .expect(HttpStatus.CREATED);

    // Store the created artist ID
    const createdArtistId = createResponse.body.id;

    expect(createResponse.body).toBeDefined();
    expect(createResponse.body.id).toBe(createdArtistId);
    expect(createResponse.body.name).toBe(createArtistDto.name);
    console.log(createResponse.body);
  });

  it('should get all artists - GET /api/artists', async () => {
    // const artists = await controller.findAll();
    // expect(Array.isArray(artists)).toBeTruthy();

    const createResponse = await request(app.getHttpServer())
      .get('/api/artists')
      .expect(HttpStatus.OK);

    expect(Array.isArray(createResponse.body)).toBe(true);
  });

  it('should get an artist - GET /api/artists/:id', async () => {
    const createArtistDto: CreateArtistDto = {
      name: faker.name.findName(),
    };

    const createResponse = await request(app.getHttpServer())
      .post('/api/artists')
      .send(createArtistDto)
      .expect(HttpStatus.CREATED);

    const artistId = createResponse.body.id;

    // Récupérer l'artiste par ID
    const getResponse = await request(app.getHttpServer())
      .get(`/api/artists/${artistId}`)
      .expect(HttpStatus.OK);

    // Vérifier la réponse
    expect(getResponse.body).toBeDefined();
    expect(getResponse.body.id).toBe(artistId);
    expect(getResponse.body.name).toBe(createArtistDto.name);

    console.log(getResponse.body);
  });

  it('should update an artist - PATCH /api/artists/:id', async () => {
    const updateArtistDto: UpdateArtistDto = {
      name: faker.name.findName(),
    };

    const createResponse = await request(app.getHttpServer())
      .post('/api/artists')
      .send(updateArtistDto)
      .expect(HttpStatus.CREATED);

    const artistId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .patch(`/api/artists/${artistId}`)
      .send(updateArtistDto)
      .expect(HttpStatus.OK);

    expect(getResponse.body).toBeDefined();
    expect(getResponse.body.id).toBe(artistId);
    expect(getResponse.body.name).toBe(updateArtistDto.name);

    // Vérifier que l'entité a été mise à jour dans la base de données
    const updatedArtist = await prismaService.artist.findUnique({
      where: { id: artistId },
    });

    expect(updatedArtist).toBeDefined();
    expect(updatedArtist.name).toBe(updateArtistDto.name);

    console.log(getResponse.body);
  });

  it('should delete an artist - DELETE /api/artists/:id', async () => {
    const createArtistDto: CreateArtistDto = {
      name: faker.name.findName(),
    };

    const createResponse = await request(app.getHttpServer())
      .post('/api/artists')
      .send(createArtistDto)
      .expect(HttpStatus.CREATED);

    const artistId = createResponse.body.id;

    // Supprimer l'artiste par ID
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/api/artists/${artistId}`)
      .expect(HttpStatus.OK);

    // Vérifier la réponse
    expect(deleteResponse.body).toBeDefined();
    expect(deleteResponse.body.id).toBe(artistId);

    // Vérifier que l'artiste a été effectivement supprimé de la base de données
    const deletedArtist = await prismaService.artist.findUnique({
      where: { id: artistId },
    });

    expect(deletedArtist).toBeNull();
  });
});
