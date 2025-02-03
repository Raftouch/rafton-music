import { Injectable } from '@nestjs/common';
import { Song, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  // async getUserFavs(userId: string): Promise<Song[]> {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: userId },
  //     include: { favorites: true },
  //   });

  //   console.log('user :', user);

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   return user.favorites;
  // }

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
        favoriteSongs: {
          connect: { id: songId },
        },
      },
      include: {
        favoriteSongs: true,
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
        favoriteSongs: {
          disconnect: { id: songId },
        },
      },
      include: {
        favoriteSongs: true,
      },
    });
  }
}
