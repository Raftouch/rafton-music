import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { songs } from '@prisma/client';
import { FileType, FilesService } from '../files/files.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,
    private file: FilesService,
  ) {}

  async create(createSongDto: CreateSongDto, image, audio): Promise<songs> {
    const imagePath = this.file.createFile(FileType.IMAGE, image);
    const audioPath = this.file.createFile(FileType.AUDIO, audio);
    const songData = {
      ...createSongDto,
      image: imagePath,
      audio: audioPath,
    };
    console.log(songData);
    console.log(imagePath);

    const song = await this.prisma.songs.create({
      data: songData,
    });

    return song;
  }

  async findAll(): Promise<songs[]> {
    const songs = await this.prisma.songs.findMany({ where: {} });
    return songs;
  }

  async findOne(id: string): Promise<songs> {
    const song = await this.prisma.songs.findUnique({
      where: { id },
      include: {
        artists: true,
        genres: true,
      },
    });
    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto): Promise<songs> {
    const song = await this.prisma.songs.update({
      where: { id },
      data: updateSongDto,
    });
    return song;
  }

  async remove(id: string): Promise<songs> {
    const song = await this.prisma.songs.delete({ where: { id } });
    return song;
  }
}
