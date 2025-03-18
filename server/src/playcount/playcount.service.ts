import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaycountService {
  constructor(private readonly prisma: PrismaService) {}

  async trackPlaycount(userId: string, songId: string) {
    try {
      const songExists = await this.prisma.song.findUnique({
        where: { id: songId },
      });

      if (!songExists) {
        throw new Error(`Song with ID ${songId} not found`);
      }

      const userHasPlayedSong = await this.prisma.songPlayHistory.findFirst({
        where: {
          userId,
          songId,
        },
      });

      if (!userHasPlayedSong) {
        await this.prisma.song.update({
          where: { id: songId },
          data: {
            playcount: { increment: 1 },
          },
        });
      }

      await this.prisma.songPlayHistory.create({
        data: {
          userId,
          songId,
        },
      });
    } catch (error) {
      console.error('Error tracking playcount:', error.message);
      throw new Error('Failed to track playcount');
    }
  }
}
