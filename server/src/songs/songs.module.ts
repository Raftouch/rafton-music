import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { FilesService } from '../files/files.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [SongsController],
  providers: [SongsService, FilesService, JwtService, LoggerService],
  imports: [PrismaModule],
})
export class SongsModule {}
