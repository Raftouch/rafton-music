import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addToFavs(userId: string, songId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const song = await this.prisma.song.findUnique({ where: { id: songId } });

    if (!song) {
      throw new Error('Song not found');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: songId },
        },
      },
      include: {
        favorites: true,
      },
    });
  }

  async removeFromFavs(userId: string, songId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const song = await this.prisma.song.findUnique({ where: { id: songId } });

    if (!song) {
      throw new Error('Song not found');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: songId },
        },
      },
      include: {
        favorites: true,
      },
    });
  }
}
