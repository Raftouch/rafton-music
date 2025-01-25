import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaycountService {
  constructor(private readonly prisma: PrismaService) {}

  async trackPlaycount(userId: string, songId: string) {
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

    // create new record
    await this.prisma.songPlayHistory.create({
      data: {
        userId,
        songId,
      },
    });
  }
}
