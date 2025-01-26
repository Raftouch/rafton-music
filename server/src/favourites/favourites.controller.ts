import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FavoritesService } from './favourites.service';

@Controller('api/favorites')
export class FavouritesController {
  constructor(private readonly favorites: FavoritesService) {}

  @Post()
  addFavorite(@Body() body: { userId: string; songId: string }) {
    return this.favorites.addToFavs(body.userId, body.songId);
  }

  @Delete()
  removeFavorite(@Body() body: { userId: string; songId: string }) {
    return this.favorites.removeFromFavs(body.userId, body.songId);
  }
}
