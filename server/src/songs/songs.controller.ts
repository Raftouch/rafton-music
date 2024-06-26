import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SongEntity } from './entities/song.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('api/songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: SongEntity })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() createSongDto: CreateSongDto) {
    const { image, audio } = files;
    // console.log(files);
    return this.songsService.create(createSongDto, image[0], audio[0]);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SongEntity, isArray: true })
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SongEntity })
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SongEntity })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    const { image, audio } = files;

    return this.songsService.update(
      id,
      updateSongDto,
      image ? image[0] : null,
      audio ? audio[0] : null,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SongEntity })
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
