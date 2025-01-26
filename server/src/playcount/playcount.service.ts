import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaycountService {
  constructor(private readonly prisma: PrismaService) {}

  async trackPlaycount(userId: string, songId: string) {
    try {
      console.log('Tracking playcount for user:', userId, 'and song:', songId);

      const songExists = await this.prisma.song.findUnique({
        where: { id: songId },
      });

      if (!songExists) {
        console.log('Song not found in the database');
        throw new Error(`Song with ID ${songId} not found`);
      }

      const userHasPlayedSong = await this.prisma.songPlayHistory.findFirst({
        where: {
          userId,
          songId,
        },
      });

      console.log(`User has played song: ${userHasPlayedSong ? 'Yes' : 'No'}`);

      if (!userHasPlayedSong) {
        console.log(`Incrementing play count for songId: ${songId}`);
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
    } catch (error) {
      console.error('Error tracking playcount:', error.message);
      throw new Error('Failed to track playcount');
    }
  }
}
