import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistsModule } from './artists/artists.module';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ArtistsModule,
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
