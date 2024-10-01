import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GenresController],
  providers: [GenresService, JwtService],
  imports: [PrismaModule],
})
export class GenresModule { }
