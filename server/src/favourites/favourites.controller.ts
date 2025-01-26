import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('api/favourites')
export class FavouritesController {
  constructor(private readonly favourites: FavouritesService) {}

  @Post()
  addFavourite(@Body() body: { userId: string; songId: string }) {
    return this.favourites.addToFavs(body.userId, body.songId);
  }

  @Delete()
  removeFavourite(@Body() body: { userId: string; songId: string }) {
    return this.favourites.removeFromFavs(body.userId, body.songId);
  }
}
