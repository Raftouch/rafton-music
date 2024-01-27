import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({ data: createGenreDto });
  }

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    return this.prisma.genre.findUnique({ where: { id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({ where: { id }, data: updateGenreDto });
  }

  async remove(id: number) {
    return this.prisma.genre.delete({ where: { id } });
  }
}
