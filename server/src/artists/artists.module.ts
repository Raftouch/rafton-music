import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, JwtService],
  imports: [PrismaModule],
})
export class ArtistsModule { }
