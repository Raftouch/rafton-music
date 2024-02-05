import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Song } from '@prisma/client';
import { FileType, FilesService } from 'src/files/files.service';

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,
    private file: FilesService,
  ) {}

  async create(createSongDto: CreateSongDto, image, audio): Promise<Song> {
    const imagePath = this.file.createFile(FileType.IMAGE, image);
    const audioPath = this.file.createFile(FileType.AUDIO, audio);
    const songData = {
      ...createSongDto,
      image: imagePath,
      audio: audioPath,
    };
    console.log(songData);
    console.log(imagePath);

    const song = await this.prisma.song.create({
      data: songData,
    });

    return song;
  }

  async findAll(): Promise<Song[]> {
    const songs = await this.prisma.song.findMany({ where: {} });
    return songs;
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: {
        artist: true,
        genre: true,
      },
    });
    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.prisma.song.update({
      where: { id },
      data: updateSongDto,
    });
    return song;
  }

  async remove(id: number): Promise<Song> {
    const song = await this.prisma.song.delete({ where: { id } });
    return song;
  }
}
