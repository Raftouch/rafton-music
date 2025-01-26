import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addToFavs(userId: string, songId: string) {}

  async removeFromFavs(userId: string, songId: string) {}
}
