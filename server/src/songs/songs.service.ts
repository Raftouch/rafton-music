import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async create(createSongDto: CreateSongDto) {
    return this.prisma.song.create({ data: createSongDto });
  }

  async findAll() {
    return this.prisma.song.findMany({ where: {} });
  }

  async findOne(id: number) {
    return this.prisma.song.findUnique({
      where: { id },
      include: {
        artist: true,
        genre: true,
      },
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return this.prisma.song.update({ where: { id }, data: updateSongDto });
  }

  async remove(id: number) {
    return this.prisma.song.delete({ where: { id } });
  }
}
