import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artists.create({ data: createArtistDto });
  }

  async findAll() {
    return this.prisma.artists.findMany();
  }

  async findOne(id: string) {
    return this.prisma.artists.findUnique({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artists.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    return this.prisma.artists.delete({ where: { id } });
  }
}
