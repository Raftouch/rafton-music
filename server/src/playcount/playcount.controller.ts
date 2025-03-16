import { Body, Controller, Post } from '@nestjs/common';
import { PlaycountService } from './playcount.service';

@Controller('api/playcount-records')
export class PlaycountController {
  constructor(private readonly playcountService: PlaycountService) {}

  @Post()
  //   create(@Body() dto: PlaycountRecordDto): Promise<PlaycountRecordDto> {
  create(@Body() body: { userId: string; songId: string }) {
    return this.playcountService.trackPlaycount(body.userId, body.songId);
  }
}
