import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { FilesService } from '../files/files.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { HttpService } from '@nestjs/axios';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    FilesService,
    JwtService,
    LoggerService,
    HttpService,
  ],
  imports: [PrismaModule],
})
export class SongsModule {}
