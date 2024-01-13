import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}
  create(createSongDto: CreateSongDto) {
    return this.prisma.song.create({ data: createSongDto });
  }

  findAll() {
    return this.prisma.song.findMany({ where: {} });
  }

  findOne(id: number) {
    return this.prisma.song.findUnique({ where: { id } });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.prisma.song.update({ where: { id }, data: updateSongDto });
  }

  remove(id: number) {
    return this.prisma.song.delete({ where: { id } });
  }
}
