import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genres.create({ data: createGenreDto });
  }

  async findAll() {
    return this.prisma.genres.findMany();
  }

  async findOne(id: string) {
    return this.prisma.genres.findUnique({ where: { id } });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genres.update({ where: { id }, data: updateGenreDto });
  }

  async remove(id: string) {
    return this.prisma.genres.delete({ where: { id } });
  }
}
