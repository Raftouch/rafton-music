import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
// import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from '@prisma/client';
import { FileType, FilesService } from '../files/files.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,
    private file: FilesService,
  ) {}

  async create(
    createSongDto: CreateSongDto,
    image: string,
    audio: string,
  ): Promise<Song> {
    const imagePath = this.file.createFile(FileType.IMAGE, image);
    const audioPath = this.file.createFile(FileType.AUDIO, audio);

    const { artist, genre, ...songData } = createSongDto;

    const existingArtist = await this.prisma.artist.findFirst({
      where: { name: artist.name },
    });

    const existingGenre = await this.prisma.genre.findFirst({
      where: { type: genre.type },
    });

    const artistData = existingArtist
      ? { connect: { id: existingArtist.id } }
      : { create: { name: artist.name } };
    const genreData = existingGenre
      ? { connect: { id: existingGenre.id } }
      : { create: { type: genre.type } };

    const song = await this.prisma.song.create({
      data: {
        ...songData,
        image: imagePath,
        audio: audioPath,
        artist: artistData,
        genre: genreData,
      },
    });

    return song;
  }

  async findAll(): Promise<Song[]> {
    const songs = await this.prisma.song.findMany({ where: {} });
    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: {
        artist: true,
        genre: true,
      },
    });
    return song;
  }

  // async update(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
  //   const song = await this.prisma.song.update({
  //     where: { id },
  //     data: updateSongDto,
  //   });
  //   return song;
  // }

  async remove(id: string): Promise<Song> {
    const song = await this.prisma.song.delete({ where: { id } });
    return song;
  }
}
