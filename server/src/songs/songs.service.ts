import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma, Song } from '@prisma/client';
import { FileType, FilesService } from '../files/files.service';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';

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
    const songs = await this.prisma.song.findMany({
      where: {},
      orderBy: {
        uploadedAt: 'desc',
      },
      include: {
        artist: true,
        genre: true,
      },
    });
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

  async update(
    id: string,
    updateSongDto: UpdateSongDto,
    image: string,
    audio: string,
  ): Promise<Song> {
    const updateData: Prisma.SongUpdateInput = {};
    const { artist, genre, ...songData } = updateSongDto;

    if (image) {
      const imagePath = this.file.createFile(FileType.IMAGE, image);
      updateData.image = imagePath;
    }

    if (audio) {
      const audioPath = this.file.createFile(FileType.AUDIO, audio);
      updateData.audio = audioPath;
    }

    if (artist) {
      const existingArtist = await this.prisma.artist.findFirst({
        where: { name: artist.name },
      });

      existingArtist
        ? (updateData.artist = { connect: { id: existingArtist.id } })
        : (updateData.artist = { create: { name: artist.name } });
    }

    if (genre) {
      const existingGenre = await this.prisma.genre.findFirst({
        where: { type: genre.type },
      });

      existingGenre
        ? (updateData.genre = { connect: { id: existingGenre.id } })
        : (updateData.genre = { create: { type: genre.type } });
    }

    Object.assign(updateData, songData);

    const updatedSong = await this.prisma.song.update({
      where: { id },
      data: updateData,
    });

    return updatedSong;
  }

  async remove(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    if (song.image) {
      // Extract the filename from the path
      const imageFileName = path.basename(song.image);
      try {
        await this.file.removeFile(FileType.IMAGE, imageFileName);
      } catch (error) {
        console.error(`Failed to delete image file: ${error.message}`);
      }
    }

    if (song.audio) {
      // Extract the filename from the path
      const audioFileName = path.basename(song.audio);
      try {
        await this.file.removeFile(FileType.AUDIO, audioFileName);
      } catch (error) {
        console.error(`Failed to delete audio file: ${error.message}`);
      }
    }

    return await this.prisma.song.delete({ where: { id } });
  }
}
