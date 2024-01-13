import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SongEntity } from './entities/song.entity';

@Controller('api/songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiCreatedResponse({ type: SongEntity })
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  @ApiOkResponse({ type: SongEntity, isArray: true })
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SongEntity })
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SongEntity })
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SongEntity })
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}
