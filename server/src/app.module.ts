import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistsModule } from './artists/artists.module';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { GenresModule } from './genres/genres.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { AccessTokenStrategy } from './auth/strategies/access-token.strategy';
import { HealthController } from './health/health.controller';
import { LoggerService } from './logger/logger.service';
import { HttpModule } from '@nestjs/axios';
import { LoggerController } from './logger/logger.controller';
import { PlaycountService } from './playcount/playcount.service';
import { PlaycountController } from './playcount/playcount.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ArtistsModule,
    SongsModule,
    GenresModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'static'),
      // rootPath: path.resolve(__dirname, 'static'),
    }),
    AuthModule,
    UsersModule,
    HttpModule,
  ],
  controllers: [AppController, HealthController, LoggerController, PlaycountController],
  providers: [AppService, AccessTokenStrategy, LoggerService, PlaycountService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
