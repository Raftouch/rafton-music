import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(id: number) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: number) {
    return this.prisma.artist.delete({ where: { id } });
  }
}
