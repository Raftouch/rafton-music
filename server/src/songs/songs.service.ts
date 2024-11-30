import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Prisma, Song } from '@prisma/client';
import { FileType, FilesService } from '../files/files.service';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class SongsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly file: FilesService,
    private readonly loggerService: LoggerService,
  ) {}

  async create(
    createSongDto: CreateSongDto,
    image: string,
    audio: string,
    userId: string,
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
        uploadedBy: { connect: { id: userId } },
      },
    });

    const songTitle =
      typeof createSongDto.title === 'object'
        ? JSON.stringify(createSongDto.title)
        : createSongDto.title;
    await this.loggerService.logEvent(
      'CREATE_SONG',
      `Song created: ${songTitle}`,
    );

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
        uploadedBy: true,
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
        uploadedBy: true,
      },
    });
    return song;
  }

  async update(
    id: string,
    updateSongDto: UpdateSongDto,
    image: string,
    audio: string,
    userId: string,
  ): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: { uploadedBy: true },
    });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    if (song.uploadedById !== userId) {
      throw new HttpException(
        'Forbidden: You can only update your own songs',
        HttpStatus.FORBIDDEN,
      );
    }

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

  async remove(id: string, userId: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: { uploadedBy: true },
    });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    if (song.uploadedById !== userId) {
      throw new HttpException(
        'Forbidden: You can only delete your own songs',
        HttpStatus.FORBIDDEN,
      );
    }

    // console.log('Song uploadedById:', song.uploadedById);
    // console.log('User attempting update userId:', userId);

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
