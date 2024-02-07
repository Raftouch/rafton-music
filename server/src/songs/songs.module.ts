import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { FilesService } from '../files/files.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SongsController],
  providers: [SongsService, FilesService],
  imports: [PrismaModule],
})
export class SongsModule {}
