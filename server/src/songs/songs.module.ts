import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [SongsController],
  providers: [SongsService, FilesService],
  imports: [PrismaModule],
})
export class SongsModule {}
