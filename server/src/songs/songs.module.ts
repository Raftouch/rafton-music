import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { FilesService } from '../files/files.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SongsController],
  providers: [SongsService, FilesService, JwtService, LoggerService],
  imports: [PrismaModule, HttpModule],
})
export class SongsModule {}
