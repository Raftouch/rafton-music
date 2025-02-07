import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('api/users')
export class FavoritesController {
  constructor(private readonly favorites: FavoritesService) {}

  // @Get(':userId/favorites')
  // getUserFavorites(@Param('userId') userId: string) {
  //   console.log('hello from user favs');
  //   return this.favorites.getUserFavs(userId);
  // }

  @Post(':userId/favorites')
  addOrRemoveFavorite(
    @Param('userId') userId: string,
    @Body('songId') songId: string,
  ) {
    return this.favorites.addOrRemoveFavSong(userId, songId);
  }
  // @Post(':userId/favorites')
  // addFavorite(@Param('userId') userId: string, @Body('songId') songId: string) {
  //   return this.favorites.addToFavs(userId, songId);
  // }

  // @Delete(':userId/favorites')
  // removeFavorite(
  //   @Param('userId') userId: string,
  //   @Body('songId') songId: string,
  // ) {
  //   return this.favorites.removeFromFavs(userId, songId);
  // }
}
